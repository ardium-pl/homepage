import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, PLATFORM_ID, ViewChild, effect, inject } from '@angular/core';
import { createAsyncContent } from '@utils/async-content';
import { ClientLogosService } from './client-logos.service';

@Component({
  selector: 'app-client-logos-section',
  standalone: true,
  templateUrl: './client-logos.section.html',
  styleUrl: './client-logos.section.scss',
})
export class ClientLogosSection {
  @ViewChild('carousel') private carousel?: ElementRef<HTMLElement>;

  readonly copies = [0, 1, 2] as const;

  private readonly clientLogosService = inject(ClientLogosService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private timer?: ReturnType<typeof setInterval>;
  private resizeObserver?: ResizeObserver;
  private reducedMotionQuery?: MediaQueryList;
  private initializationTimer?: ReturnType<typeof setTimeout>;
  private resetTimer?: ReturnType<typeof setTimeout>;
  private destroyed = false;
  private pointerId?: number;
  private pointerX = 0;
  private pointerScrollLeft = 0;

  private readonly contentState = createAsyncContent(() => this.clientLogosService.getClientLogos());
  readonly logos = this.contentState.content;
  readonly loading = this.contentState.loading;
  readonly error = this.contentState.error;

  constructor() {
    effect(() => {
      if (!this.logos() || !isPlatformBrowser(this.platformId)) return;
      if (this.initializationTimer) clearTimeout(this.initializationTimer);
      this.initializationTimer = setTimeout(() => {
        this.initializationTimer = undefined;
        void this.initializeCarousel();
      });
    });

    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.stopAutoPlay();
      this.resizeObserver?.disconnect();
      this.reducedMotionQuery?.removeEventListener('change', this.onReducedMotionChange);
      if (this.initializationTimer) clearTimeout(this.initializationTimer);
      if (this.resetTimer) clearTimeout(this.resetTimer);
    });
  }

  onPointerDown(event: PointerEvent): void {
    const element = this.carousel?.nativeElement;
    if (!element) return;
    this.pointerId = event.pointerId;
    this.pointerX = event.clientX;
    this.pointerScrollLeft = element.scrollLeft;
    element.setPointerCapture(event.pointerId);
    this.pauseAutoPlay();
  }

  onPointerMove(event: PointerEvent): void {
    const element = this.carousel?.nativeElement;
    if (!element || event.pointerId !== this.pointerId) return;
    element.scrollLeft = this.pointerScrollLeft - (event.clientX - this.pointerX);
  }

  onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) return;
    const element = this.carousel?.nativeElement;
    if (element?.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    this.pointerId = undefined;
    this.resumeAutoPlay();
  }

  onScroll(): void {
    const element = this.carousel?.nativeElement;
    if (!element || this.resetTimer) return;

    this.resetTimer = setTimeout(() => {
      this.resetTimer = undefined;
      const copyWidth = element.scrollWidth / this.copies.length;
      if (element.scrollLeft < copyWidth * 0.5) element.scrollLeft += copyWidth;
      if (element.scrollLeft > copyWidth * 1.5) element.scrollLeft -= copyWidth;
    }, 100);
  }

  pauseAutoPlay(): void {
    this.stopAutoPlay();
  }

  resumeAutoPlay(): void {
    this.startAutoPlay();
  }

  private centerOnMiddleCopy(): void {
    const element = this.carousel?.nativeElement;
    if (element?.scrollWidth) element.scrollLeft = element.scrollWidth / this.copies.length;
  }

  private async initializeCarousel(): Promise<void> {
    const element = this.carousel?.nativeElement;
    if (!element || this.destroyed) return;

    this.resizeObserver?.disconnect();
    if (!this.reducedMotionQuery) {
      this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotionQuery.addEventListener('change', this.onReducedMotionChange);
    }
    this.resizeObserver = new ResizeObserver(() => this.centerOnMiddleCopy());
    this.resizeObserver.observe(element);

    const images = Array.from(element.querySelectorAll<HTMLImageElement>('.logo-item img'));
    await Promise.allSettled(images.map((image) => image.decode()));

    if (this.destroyed || this.carousel?.nativeElement !== element) return;
    this.centerOnMiddleCopy();
    this.startAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    const element = this.carousel?.nativeElement;
    if (!element || this.reducedMotionQuery?.matches) return;

    this.timer = setInterval(() => {
      const firstItem = element.querySelector<HTMLElement>('.logo-item');
      const originalWidth = element.scrollWidth / this.copies.length;
      if (!firstItem || originalWidth <= element.clientWidth) return;

      const styles = getComputedStyle(element);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      element.scrollBy({ left: firstItem.offsetWidth + gap, behavior: 'smooth' });
    }, 3500);
  }

  private stopAutoPlay(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
  }

  private readonly onReducedMotionChange = (): void => {
    if (this.reducedMotionQuery?.matches) this.stopAutoPlay();
    else this.startAutoPlay();
  };
}
