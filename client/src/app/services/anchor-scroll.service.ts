import { DOCUMENT, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { DestroyRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnchorScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private observer?: ResizeObserver;
  private correctionFrame?: number;
  private correctionTimeout?: number;

  constructor() {
    if (!this.isBrowser) return;

    this.viewportScroller.setOffset(() => [0, this.headerHeight]);
    this.router.events
      .pipe(
        filter((event): event is Scroll => event instanceof Scroll),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => this.handleScroll(event));

    this.destroyRef.onDestroy(() => this.stopCorrections());
  }

  private handleScroll(event: Scroll): void {
    this.stopCorrections();
    if (!event.anchor) return;

    const window = this.document.defaultView;
    if (!window) return;

    const correctPosition = () => {
      window.cancelAnimationFrame(this.correctionFrame ?? 0);
      this.correctionFrame = window.requestAnimationFrame(() => {
        if (this.document.getElementById(event.anchor!)) {
          this.viewportScroller.scrollToAnchor(event.anchor!);
        }
      });
    };

    correctPosition();
    this.observer = new ResizeObserver(correctPosition);
    this.observer.observe(this.document.body);
    this.correctionTimeout = window.setTimeout(() => this.stopCorrections(), 10_000);
  }

  private stopCorrections(): void {
    const window = this.document.defaultView;
    this.observer?.disconnect();
    this.observer = undefined;

    if (window && this.correctionFrame !== undefined) {
      window.cancelAnimationFrame(this.correctionFrame);
    }
    if (window && this.correctionTimeout !== undefined) {
      window.clearTimeout(this.correctionTimeout);
    }

    this.correctionFrame = undefined;
    this.correctionTimeout = undefined;
  }

  private get headerHeight(): number {
    return this.document.querySelector('app-header header')?.clientHeight ?? 0;
  }
}
