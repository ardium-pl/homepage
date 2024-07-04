var Rp = Object.defineProperty,
  Fp = Object.defineProperties;
var Pp = Object.getOwnPropertyDescriptors;
var mc = Object.getOwnPropertySymbols;
var kp = Object.prototype.hasOwnProperty,
  Lp = Object.prototype.propertyIsEnumerable;
var vc = (t, e, r) =>
    e in t
      ? Rp(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[e] = r),
  p = (t, e) => {
    for (var r in (e ||= {})) kp.call(e, r) && vc(t, r, e[r]);
    if (mc) for (var r of mc(e)) Lp.call(e, r) && vc(t, r, e[r]);
    return t;
  },
  $ = (t, e) => Fp(t, Pp(e));
function yc(t, e) {
  return Object.is(t, e);
}
var J = null,
  Vr = !1,
  jr = 1,
  rt = Symbol("SIGNAL");
function P(t) {
  let e = J;
  return (J = t), e;
}
var Ur = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Ki(t) {
  if (Vr) throw new Error("");
  if (J === null) return;
  J.consumerOnSignalRead(t);
  let e = J.nextProducerIndex++;
  if ((Qt(J), e < J.producerNode.length && J.producerNode[e] !== t && Un(J))) {
    let r = J.producerNode[e];
    Br(r, J.producerIndexOfThis[e]);
  }
  J.producerNode[e] !== t &&
    ((J.producerNode[e] = t),
    (J.producerIndexOfThis[e] = Un(J) ? Ic(t, J, e) : 0)),
    (J.producerLastReadVersion[e] = t.version);
}
function Vp() {
  jr++;
}
function Dc(t) {
  if (!(Un(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === jr)) {
    if (!t.producerMustRecompute(t) && !es(t)) {
      (t.dirty = !1), (t.lastCleanEpoch = jr);
      return;
    }
    t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = jr);
  }
}
function Cc(t) {
  if (t.liveConsumerNode === void 0) return;
  let e = Vr;
  Vr = !0;
  try {
    for (let r of t.liveConsumerNode) r.dirty || jp(r);
  } finally {
    Vr = e;
  }
}
function wc() {
  return J?.consumerAllowSignalWrites !== !1;
}
function jp(t) {
  (t.dirty = !0), Cc(t), t.consumerMarkedDirty?.(t);
}
function Ji(t) {
  return t && (t.nextProducerIndex = 0), P(t);
}
function Xi(t, e) {
  if (
    (P(e),
    !(
      !t ||
      t.producerNode === void 0 ||
      t.producerIndexOfThis === void 0 ||
      t.producerLastReadVersion === void 0
    ))
  ) {
    if (Un(t))
      for (let r = t.nextProducerIndex; r < t.producerNode.length; r++)
        Br(t.producerNode[r], t.producerIndexOfThis[r]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(),
        t.producerLastReadVersion.pop(),
        t.producerIndexOfThis.pop();
  }
}
function es(t) {
  Qt(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    let r = t.producerNode[e],
      n = t.producerLastReadVersion[e];
    if (n !== r.version || (Dc(r), n !== r.version)) return !0;
  }
  return !1;
}
function Ec(t) {
  if ((Qt(t), Un(t)))
    for (let e = 0; e < t.producerNode.length; e++)
      Br(t.producerNode[e], t.producerIndexOfThis[e]);
  (t.producerNode.length =
    t.producerLastReadVersion.length =
    t.producerIndexOfThis.length =
      0),
    t.liveConsumerNode &&
      (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Ic(t, e, r) {
  if ((bc(t), Qt(t), t.liveConsumerNode.length === 0))
    for (let n = 0; n < t.producerNode.length; n++)
      t.producerIndexOfThis[n] = Ic(t.producerNode[n], t, n);
  return t.liveConsumerIndexOfThis.push(r), t.liveConsumerNode.push(e) - 1;
}
function Br(t, e) {
  if ((bc(t), Qt(t), t.liveConsumerNode.length === 1))
    for (let n = 0; n < t.producerNode.length; n++)
      Br(t.producerNode[n], t.producerIndexOfThis[n]);
  let r = t.liveConsumerNode.length - 1;
  if (
    ((t.liveConsumerNode[e] = t.liveConsumerNode[r]),
    (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r]),
    t.liveConsumerNode.length--,
    t.liveConsumerIndexOfThis.length--,
    e < t.liveConsumerNode.length)
  ) {
    let n = t.liveConsumerIndexOfThis[e],
      o = t.liveConsumerNode[e];
    Qt(o), (o.producerIndexOfThis[n] = e);
  }
}
function Un(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function Qt(t) {
  (t.producerNode ??= []),
    (t.producerIndexOfThis ??= []),
    (t.producerLastReadVersion ??= []);
}
function bc(t) {
  (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function Mc(t) {
  let e = Object.create($p);
  e.computation = t;
  let r = () => {
    if ((Dc(e), Ki(e), e.value === $r)) throw e.error;
    return e.value;
  };
  return (r[rt] = e), r;
}
var Yi = Symbol("UNSET"),
  Qi = Symbol("COMPUTING"),
  $r = Symbol("ERRORED"),
  $p = $(p({}, Ur), {
    value: Yi,
    dirty: !0,
    error: null,
    equal: yc,
    producerMustRecompute(t) {
      return t.value === Yi || t.value === Qi;
    },
    producerRecomputeValue(t) {
      if (t.value === Qi) throw new Error("Detected cycle in computations.");
      let e = t.value;
      t.value = Qi;
      let r = Ji(t),
        n;
      try {
        n = t.computation();
      } catch (o) {
        (n = $r), (t.error = o);
      } finally {
        Xi(t, r);
      }
      if (e !== Yi && e !== $r && n !== $r && t.equal(e, n)) {
        t.value = e;
        return;
      }
      (t.value = n), t.version++;
    },
  });
function Up() {
  throw new Error();
}
var _c = Up;
function Sc() {
  _c();
}
function xc(t) {
  _c = t;
}
var Bp = null;
function Tc(t) {
  let e = Object.create(Nc);
  e.value = t;
  let r = () => (Ki(e), e.value);
  return (r[rt] = e), r;
}
function ts(t, e) {
  wc() || Sc(), t.equal(t.value, e) || ((t.value = e), Hp(t));
}
function Ac(t, e) {
  wc() || Sc(), ts(t, e(t.value));
}
var Nc = $(p({}, Ur), { equal: yc, value: void 0 });
function Hp(t) {
  t.version++, Vp(), Cc(t), Bp?.();
}
function E(t) {
  return typeof t == "function";
}
function Kt(t) {
  let r = t((n) => {
    Error.call(n), (n.stack = new Error().stack);
  });
  return (
    (r.prototype = Object.create(Error.prototype)),
    (r.prototype.constructor = r),
    r
  );
}
var Hr = Kt(
  (t) =>
    function (r) {
      t(this),
        (this.message = r
          ? `${r.length} errors occurred during unsubscription:
${r.map((n, o) => `${o + 1}) ${n.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = r);
    },
);
function Bn(t, e) {
  if (t) {
    let r = t.indexOf(e);
    0 <= r && t.splice(r, 1);
  }
}
var Q = class t {
  constructor(e) {
    (this.initialTeardown = e),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let e;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: r } = this;
      if (r)
        if (((this._parentage = null), Array.isArray(r)))
          for (let i of r) i.remove(this);
        else r.remove(this);
      let { initialTeardown: n } = this;
      if (E(n))
        try {
          n();
        } catch (i) {
          e = i instanceof Hr ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            Oc(i);
          } catch (s) {
            (e = e ?? []),
              s instanceof Hr ? (e = [...e, ...s.errors]) : e.push(s);
          }
      }
      if (e) throw new Hr(e);
    }
  }
  add(e) {
    var r;
    if (e && e !== this)
      if (this.closed) Oc(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this)) return;
          e._addParent(this);
        }
        (this._finalizers =
          (r = this._finalizers) !== null && r !== void 0 ? r : []).push(e);
      }
  }
  _hasParent(e) {
    let { _parentage: r } = this;
    return r === e || (Array.isArray(r) && r.includes(e));
  }
  _addParent(e) {
    let { _parentage: r } = this;
    this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
  }
  _removeParent(e) {
    let { _parentage: r } = this;
    r === e ? (this._parentage = null) : Array.isArray(r) && Bn(r, e);
  }
  remove(e) {
    let { _finalizers: r } = this;
    r && Bn(r, e), e instanceof t && e._removeParent(this);
  }
};
Q.EMPTY = (() => {
  let t = new Q();
  return (t.closed = !0), t;
})();
var ns = Q.EMPTY;
function zr(t) {
  return (
    t instanceof Q ||
    (t && "closed" in t && E(t.remove) && E(t.add) && E(t.unsubscribe))
  );
}
function Oc(t) {
  E(t) ? t() : t.unsubscribe();
}
var xe = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Jt = {
  setTimeout(t, e, ...r) {
    let { delegate: n } = Jt;
    return n?.setTimeout ? n.setTimeout(t, e, ...r) : setTimeout(t, e, ...r);
  },
  clearTimeout(t) {
    let { delegate: e } = Jt;
    return (e?.clearTimeout || clearTimeout)(t);
  },
  delegate: void 0,
};
function Gr(t) {
  Jt.setTimeout(() => {
    let { onUnhandledError: e } = xe;
    if (e) e(t);
    else throw t;
  });
}
function Hn() {}
var Rc = rs("C", void 0, void 0);
function Fc(t) {
  return rs("E", void 0, t);
}
function Pc(t) {
  return rs("N", t, void 0);
}
function rs(t, e, r) {
  return { kind: t, value: e, error: r };
}
var wt = null;
function Xt(t) {
  if (xe.useDeprecatedSynchronousErrorHandling) {
    let e = !wt;
    if ((e && (wt = { errorThrown: !1, error: null }), t(), e)) {
      let { errorThrown: r, error: n } = wt;
      if (((wt = null), r)) throw n;
    }
  } else t();
}
function kc(t) {
  xe.useDeprecatedSynchronousErrorHandling &&
    wt &&
    ((wt.errorThrown = !0), (wt.error = t));
}
var Et = class extends Q {
    constructor(e) {
      super(),
        (this.isStopped = !1),
        e
          ? ((this.destination = e), zr(e) && e.add(this))
          : (this.destination = qp);
    }
    static create(e, r, n) {
      return new en(e, r, n);
    }
    next(e) {
      this.isStopped ? is(Pc(e), this) : this._next(e);
    }
    error(e) {
      this.isStopped
        ? is(Fc(e), this)
        : ((this.isStopped = !0), this._error(e));
    }
    complete() {
      this.isStopped ? is(Rc, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(e) {
      this.destination.next(e);
    }
    _error(e) {
      try {
        this.destination.error(e);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  zp = Function.prototype.bind;
function os(t, e) {
  return zp.call(t, e);
}
var ss = class {
    constructor(e) {
      this.partialObserver = e;
    }
    next(e) {
      let { partialObserver: r } = this;
      if (r.next)
        try {
          r.next(e);
        } catch (n) {
          qr(n);
        }
    }
    error(e) {
      let { partialObserver: r } = this;
      if (r.error)
        try {
          r.error(e);
        } catch (n) {
          qr(n);
        }
      else qr(e);
    }
    complete() {
      let { partialObserver: e } = this;
      if (e.complete)
        try {
          e.complete();
        } catch (r) {
          qr(r);
        }
    }
  },
  en = class extends Et {
    constructor(e, r, n) {
      super();
      let o;
      if (E(e) || !e)
        o = { next: e ?? void 0, error: r ?? void 0, complete: n ?? void 0 };
      else {
        let i;
        this && xe.useDeprecatedNextContext
          ? ((i = Object.create(e)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: e.next && os(e.next, i),
              error: e.error && os(e.error, i),
              complete: e.complete && os(e.complete, i),
            }))
          : (o = e);
      }
      this.destination = new ss(o);
    }
  };
function qr(t) {
  xe.useDeprecatedSynchronousErrorHandling ? kc(t) : Gr(t);
}
function Gp(t) {
  throw t;
}
function is(t, e) {
  let { onStoppedNotification: r } = xe;
  r && Jt.setTimeout(() => r(t, e));
}
var qp = { closed: !0, next: Hn, error: Gp, complete: Hn };
var tn = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function ge(t) {
  return t;
}
function as(...t) {
  return us(t);
}
function us(t) {
  return t.length === 0
    ? ge
    : t.length === 1
      ? t[0]
      : function (r) {
          return t.reduce((n, o) => o(n), r);
        };
}
var V = (() => {
  class t {
    constructor(r) {
      r && (this._subscribe = r);
    }
    lift(r) {
      let n = new t();
      return (n.source = this), (n.operator = r), n;
    }
    subscribe(r, n, o) {
      let i = Zp(r) ? r : new en(r, n, o);
      return (
        Xt(() => {
          let { operator: s, source: a } = this;
          i.add(
            s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i),
          );
        }),
        i
      );
    }
    _trySubscribe(r) {
      try {
        return this._subscribe(r);
      } catch (n) {
        r.error(n);
      }
    }
    forEach(r, n) {
      return (
        (n = Lc(n)),
        new n((o, i) => {
          let s = new en({
            next: (a) => {
              try {
                r(a);
              } catch (u) {
                i(u), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(r) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(r);
    }
    [tn]() {
      return this;
    }
    pipe(...r) {
      return us(r)(this);
    }
    toPromise(r) {
      return (
        (r = Lc(r)),
        new r((n, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => n(i),
          );
        })
      );
    }
  }
  return (t.create = (e) => new t(e)), t;
})();
function Lc(t) {
  var e;
  return (e = t ?? xe.Promise) !== null && e !== void 0 ? e : Promise;
}
function Wp(t) {
  return t && E(t.next) && E(t.error) && E(t.complete);
}
function Zp(t) {
  return (t && t instanceof Et) || (Wp(t) && zr(t));
}
function cs(t) {
  return E(t?.lift);
}
function O(t) {
  return (e) => {
    if (cs(e))
      return e.lift(function (r) {
        try {
          return t(r, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function A(t, e, r, n, o) {
  return new ls(t, e, r, n, o);
}
var ls = class extends Et {
  constructor(e, r, n, o, i, s) {
    super(e),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = r
        ? function (a) {
            try {
              r(a);
            } catch (u) {
              e.error(u);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (u) {
              e.error(u);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = n
        ? function () {
            try {
              n();
            } catch (a) {
              e.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: r } = this;
      super.unsubscribe(),
        !r && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }
};
function nn() {
  return O((t, e) => {
    let r = null;
    t._refCount++;
    let n = A(e, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) {
        r = null;
        return;
      }
      let o = t._connection,
        i = r;
      (r = null), o && (!i || o === i) && o.unsubscribe(), e.unsubscribe();
    });
    t.subscribe(n), n.closed || (r = t.connect());
  });
}
var rn = class extends V {
  constructor(e, r) {
    super(),
      (this.source = e),
      (this.subjectFactory = r),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      cs(e) && (this.lift = e.lift);
  }
  _subscribe(e) {
    return this.getSubject().subscribe(e);
  }
  getSubject() {
    let e = this._subject;
    return (
      (!e || e.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: e } = this;
    (this._subject = this._connection = null), e?.unsubscribe();
  }
  connect() {
    let e = this._connection;
    if (!e) {
      e = this._connection = new Q();
      let r = this.getSubject();
      e.add(
        this.source.subscribe(
          A(
            r,
            void 0,
            () => {
              this._teardown(), r.complete();
            },
            (n) => {
              this._teardown(), r.error(n);
            },
            () => this._teardown(),
          ),
        ),
      ),
        e.closed && ((this._connection = null), (e = Q.EMPTY));
    }
    return e;
  }
  refCount() {
    return nn()(this);
  }
};
var Vc = Kt(
  (t) =>
    function () {
      t(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    },
);
var oe = (() => {
    class t extends V {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(r) {
        let n = new Wr(this, this);
        return (n.operator = r), n;
      }
      _throwIfClosed() {
        if (this.closed) throw new Vc();
      }
      next(r) {
        Xt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let n of this.currentObservers) n.next(r);
          }
        });
      }
      error(r) {
        Xt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = r);
            let { observers: n } = this;
            for (; n.length; ) n.shift().error(r);
          }
        });
      }
      complete() {
        Xt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: r } = this;
            for (; r.length; ) r.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var r;
        return (
          ((r = this.observers) === null || r === void 0 ? void 0 : r.length) >
          0
        );
      }
      _trySubscribe(r) {
        return this._throwIfClosed(), super._trySubscribe(r);
      }
      _subscribe(r) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(r),
          this._innerSubscribe(r)
        );
      }
      _innerSubscribe(r) {
        let { hasError: n, isStopped: o, observers: i } = this;
        return n || o
          ? ns
          : ((this.currentObservers = null),
            i.push(r),
            new Q(() => {
              (this.currentObservers = null), Bn(i, r);
            }));
      }
      _checkFinalizedStatuses(r) {
        let { hasError: n, thrownError: o, isStopped: i } = this;
        n ? r.error(o) : i && r.complete();
      }
      asObservable() {
        let r = new V();
        return (r.source = this), r;
      }
    }
    return (t.create = (e, r) => new Wr(e, r)), t;
  })(),
  Wr = class extends oe {
    constructor(e, r) {
      super(), (this.destination = e), (this.source = r);
    }
    next(e) {
      var r, n;
      (n =
        (r = this.destination) === null || r === void 0 ? void 0 : r.next) ===
        null ||
        n === void 0 ||
        n.call(r, e);
    }
    error(e) {
      var r, n;
      (n =
        (r = this.destination) === null || r === void 0 ? void 0 : r.error) ===
        null ||
        n === void 0 ||
        n.call(r, e);
    }
    complete() {
      var e, r;
      (r =
        (e = this.destination) === null || e === void 0
          ? void 0
          : e.complete) === null ||
        r === void 0 ||
        r.call(e);
    }
    _subscribe(e) {
      var r, n;
      return (n =
        (r = this.source) === null || r === void 0
          ? void 0
          : r.subscribe(e)) !== null && n !== void 0
        ? n
        : ns;
    }
  };
var ee = class extends oe {
  constructor(e) {
    super(), (this._value = e);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(e) {
    let r = super._subscribe(e);
    return !r.closed && e.next(this._value), r;
  }
  getValue() {
    let { hasError: e, thrownError: r, _value: n } = this;
    if (e) throw r;
    return this._throwIfClosed(), n;
  }
  next(e) {
    super.next((this._value = e));
  }
};
var me = new V((t) => t.complete());
function jc(t) {
  return t && E(t.schedule);
}
function $c(t) {
  return t[t.length - 1];
}
function Zr(t) {
  return E($c(t)) ? t.pop() : void 0;
}
function ot(t) {
  return jc($c(t)) ? t.pop() : void 0;
}
function Bc(t, e, r, n) {
  function o(i) {
    return i instanceof r
      ? i
      : new r(function (s) {
          s(i);
        });
  }
  return new (r || (r = Promise))(function (i, s) {
    function a(l) {
      try {
        c(n.next(l));
      } catch (d) {
        s(d);
      }
    }
    function u(l) {
      try {
        c(n.throw(l));
      } catch (d) {
        s(d);
      }
    }
    function c(l) {
      l.done ? i(l.value) : o(l.value).then(a, u);
    }
    c((n = n.apply(t, e || [])).next());
  });
}
function Uc(t) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    r = e && t[e],
    n = 0;
  if (r) return r.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function () {
        return (
          t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function It(t) {
  return this instanceof It ? ((this.v = t), this) : new It(t);
}
function Hc(t, e, r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(t, e || []),
    o,
    i = [];
  return (
    (o = {}),
    s("next"),
    s("throw"),
    s("return"),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    n[f] &&
      (o[f] = function (h) {
        return new Promise(function (m, T) {
          i.push([f, h, m, T]) > 1 || a(f, h);
        });
      });
  }
  function a(f, h) {
    try {
      u(n[f](h));
    } catch (m) {
      d(i[0][3], m);
    }
  }
  function u(f) {
    f.value instanceof It
      ? Promise.resolve(f.value.v).then(c, l)
      : d(i[0][2], f);
  }
  function c(f) {
    a("next", f);
  }
  function l(f) {
    a("throw", f);
  }
  function d(f, h) {
    f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
  }
}
function zc(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator],
    r;
  return e
    ? e.call(t)
    : ((t = typeof Uc == "function" ? Uc(t) : t[Symbol.iterator]()),
      (r = {}),
      n("next"),
      n("throw"),
      n("return"),
      (r[Symbol.asyncIterator] = function () {
        return this;
      }),
      r);
  function n(i) {
    r[i] =
      t[i] &&
      function (s) {
        return new Promise(function (a, u) {
          (s = t[i](s)), o(a, u, s.done, s.value);
        });
      };
  }
  function o(i, s, a, u) {
    Promise.resolve(u).then(function (c) {
      i({ value: c, done: a });
    }, s);
  }
}
var Yr = (t) => t && typeof t.length == "number" && typeof t != "function";
function Qr(t) {
  return E(t?.then);
}
function Kr(t) {
  return E(t[tn]);
}
function Jr(t) {
  return Symbol.asyncIterator && E(t?.[Symbol.asyncIterator]);
}
function Xr(t) {
  return new TypeError(
    `You provided ${t !== null && typeof t == "object" ? "an invalid object" : `'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
  );
}
function Yp() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var eo = Yp();
function to(t) {
  return E(t?.[eo]);
}
function no(t) {
  return Hc(this, arguments, function* () {
    let r = t.getReader();
    try {
      for (;;) {
        let { value: n, done: o } = yield It(r.read());
        if (o) return yield It(void 0);
        yield yield It(n);
      }
    } finally {
      r.releaseLock();
    }
  });
}
function ro(t) {
  return E(t?.getReader);
}
function q(t) {
  if (t instanceof V) return t;
  if (t != null) {
    if (Kr(t)) return Qp(t);
    if (Yr(t)) return Kp(t);
    if (Qr(t)) return Jp(t);
    if (Jr(t)) return Gc(t);
    if (to(t)) return Xp(t);
    if (ro(t)) return eg(t);
  }
  throw Xr(t);
}
function Qp(t) {
  return new V((e) => {
    let r = t[tn]();
    if (E(r.subscribe)) return r.subscribe(e);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable",
    );
  });
}
function Kp(t) {
  return new V((e) => {
    for (let r = 0; r < t.length && !e.closed; r++) e.next(t[r]);
    e.complete();
  });
}
function Jp(t) {
  return new V((e) => {
    t.then(
      (r) => {
        e.closed || (e.next(r), e.complete());
      },
      (r) => e.error(r),
    ).then(null, Gr);
  });
}
function Xp(t) {
  return new V((e) => {
    for (let r of t) if ((e.next(r), e.closed)) return;
    e.complete();
  });
}
function Gc(t) {
  return new V((e) => {
    tg(t, e).catch((r) => e.error(r));
  });
}
function eg(t) {
  return Gc(no(t));
}
function tg(t, e) {
  var r, n, o, i;
  return Bc(this, void 0, void 0, function* () {
    try {
      for (r = zc(t); (n = yield r.next()), !n.done; ) {
        let s = n.value;
        if ((e.next(s), e.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        n && !n.done && (i = r.return) && (yield i.call(r));
      } finally {
        if (o) throw o.error;
      }
    }
    e.complete();
  });
}
function ce(t, e, r, n = 0, o = !1) {
  let i = e.schedule(function () {
    r(), o ? t.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if ((t.add(i), !o)) return i;
}
function oo(t, e = 0) {
  return O((r, n) => {
    r.subscribe(
      A(
        n,
        (o) => ce(n, t, () => n.next(o), e),
        () => ce(n, t, () => n.complete(), e),
        (o) => ce(n, t, () => n.error(o), e),
      ),
    );
  });
}
function io(t, e = 0) {
  return O((r, n) => {
    n.add(t.schedule(() => r.subscribe(n), e));
  });
}
function qc(t, e) {
  return q(t).pipe(io(e), oo(e));
}
function Wc(t, e) {
  return q(t).pipe(io(e), oo(e));
}
function Zc(t, e) {
  return new V((r) => {
    let n = 0;
    return e.schedule(function () {
      n === t.length
        ? r.complete()
        : (r.next(t[n++]), r.closed || this.schedule());
    });
  });
}
function Yc(t, e) {
  return new V((r) => {
    let n;
    return (
      ce(r, e, () => {
        (n = t[eo]()),
          ce(
            r,
            e,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = n.next());
              } catch (s) {
                r.error(s);
                return;
              }
              i ? r.complete() : r.next(o);
            },
            0,
            !0,
          );
      }),
      () => E(n?.return) && n.return()
    );
  });
}
function so(t, e) {
  if (!t) throw new Error("Iterable cannot be null");
  return new V((r) => {
    ce(r, e, () => {
      let n = t[Symbol.asyncIterator]();
      ce(
        r,
        e,
        () => {
          n.next().then((o) => {
            o.done ? r.complete() : r.next(o.value);
          });
        },
        0,
        !0,
      );
    });
  });
}
function Qc(t, e) {
  return so(no(t), e);
}
function Kc(t, e) {
  if (t != null) {
    if (Kr(t)) return qc(t, e);
    if (Yr(t)) return Zc(t, e);
    if (Qr(t)) return Wc(t, e);
    if (Jr(t)) return so(t, e);
    if (to(t)) return Yc(t, e);
    if (ro(t)) return Qc(t, e);
  }
  throw Xr(t);
}
function G(t, e) {
  return e ? Kc(t, e) : q(t);
}
function w(...t) {
  let e = ot(t);
  return G(t, e);
}
function on(t, e) {
  let r = E(t) ? t : () => t,
    n = (o) => o.error(r());
  return new V(e ? (o) => e.schedule(n, 0, o) : n);
}
function ds(t) {
  return !!t && (t instanceof V || (E(t.lift) && E(t.subscribe)));
}
var We = Kt(
  (t) =>
    function () {
      t(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    },
);
function N(t, e) {
  return O((r, n) => {
    let o = 0;
    r.subscribe(
      A(n, (i) => {
        n.next(t.call(e, i, o++));
      }),
    );
  });
}
var { isArray: ng } = Array;
function rg(t, e) {
  return ng(e) ? t(...e) : t(e);
}
function ao(t) {
  return N((e) => rg(t, e));
}
var { isArray: og } = Array,
  { getPrototypeOf: ig, prototype: sg, keys: ag } = Object;
function uo(t) {
  if (t.length === 1) {
    let e = t[0];
    if (og(e)) return { args: e, keys: null };
    if (ug(e)) {
      let r = ag(e);
      return { args: r.map((n) => e[n]), keys: r };
    }
  }
  return { args: t, keys: null };
}
function ug(t) {
  return t && typeof t == "object" && ig(t) === sg;
}
function co(t, e) {
  return t.reduce((r, n, o) => ((r[n] = e[o]), r), {});
}
function lo(...t) {
  let e = ot(t),
    r = Zr(t),
    { args: n, keys: o } = uo(t);
  if (n.length === 0) return G([], e);
  let i = new V(cg(n, e, o ? (s) => co(o, s) : ge));
  return r ? i.pipe(ao(r)) : i;
}
function cg(t, e, r = ge) {
  return (n) => {
    Jc(
      e,
      () => {
        let { length: o } = t,
          i = new Array(o),
          s = o,
          a = o;
        for (let u = 0; u < o; u++)
          Jc(
            e,
            () => {
              let c = G(t[u], e),
                l = !1;
              c.subscribe(
                A(
                  n,
                  (d) => {
                    (i[u] = d), l || ((l = !0), a--), a || n.next(r(i.slice()));
                  },
                  () => {
                    --s || n.complete();
                  },
                ),
              );
            },
            n,
          );
      },
      n,
    );
  };
}
function Jc(t, e, r) {
  t ? ce(r, t, e) : e();
}
function Xc(t, e, r, n, o, i, s, a) {
  let u = [],
    c = 0,
    l = 0,
    d = !1,
    f = () => {
      d && !u.length && !c && e.complete();
    },
    h = (T) => (c < n ? m(T) : u.push(T)),
    m = (T) => {
      i && e.next(T), c++;
      let z = !1;
      q(r(T, l++)).subscribe(
        A(
          e,
          (L) => {
            o?.(L), i ? h(L) : e.next(L);
          },
          () => {
            z = !0;
          },
          void 0,
          () => {
            if (z)
              try {
                for (c--; u.length && c < n; ) {
                  let L = u.shift();
                  s ? ce(e, s, () => m(L)) : m(L);
                }
                f();
              } catch (L) {
                e.error(L);
              }
          },
        ),
      );
    };
  return (
    t.subscribe(
      A(e, h, () => {
        (d = !0), f();
      }),
    ),
    () => {
      a?.();
    }
  );
}
function K(t, e, r = 1 / 0) {
  return E(e)
    ? K((n, o) => N((i, s) => e(n, i, o, s))(q(t(n, o))), r)
    : (typeof e == "number" && (r = e), O((n, o) => Xc(n, o, t, r)));
}
function sn(t = 1 / 0) {
  return K(ge, t);
}
function el() {
  return sn(1);
}
function an(...t) {
  return el()(G(t, ot(t)));
}
function fo(t) {
  return new V((e) => {
    q(t()).subscribe(e);
  });
}
function fs(...t) {
  let e = Zr(t),
    { args: r, keys: n } = uo(t),
    o = new V((i) => {
      let { length: s } = r;
      if (!s) {
        i.complete();
        return;
      }
      let a = new Array(s),
        u = s,
        c = s;
      for (let l = 0; l < s; l++) {
        let d = !1;
        q(r[l]).subscribe(
          A(
            i,
            (f) => {
              d || ((d = !0), c--), (a[l] = f);
            },
            () => u--,
            void 0,
            () => {
              (!u || !d) && (c || i.next(n ? co(n, a) : a), i.complete());
            },
          ),
        );
      }
    });
  return e ? o.pipe(ao(e)) : o;
}
function Te(t, e) {
  return O((r, n) => {
    let o = 0;
    r.subscribe(A(n, (i) => t.call(e, i, o++) && n.next(i)));
  });
}
function it(t) {
  return O((e, r) => {
    let n = null,
      o = !1,
      i;
    (n = e.subscribe(
      A(r, void 0, void 0, (s) => {
        (i = q(t(s, it(t)(e)))),
          n ? (n.unsubscribe(), (n = null), i.subscribe(r)) : (o = !0);
      }),
    )),
      o && (n.unsubscribe(), (n = null), i.subscribe(r));
  });
}
function tl(t, e, r, n, o) {
  return (i, s) => {
    let a = r,
      u = e,
      c = 0;
    i.subscribe(
      A(
        s,
        (l) => {
          let d = c++;
          (u = a ? t(u, l, d) : ((a = !0), l)), n && s.next(u);
        },
        o &&
          (() => {
            a && s.next(u), s.complete();
          }),
      ),
    );
  };
}
function un(t, e) {
  return E(e) ? K(t, e, 1) : K(t, 1);
}
function st(t) {
  return O((e, r) => {
    let n = !1;
    e.subscribe(
      A(
        r,
        (o) => {
          (n = !0), r.next(o);
        },
        () => {
          n || r.next(t), r.complete();
        },
      ),
    );
  });
}
function Ze(t) {
  return t <= 0
    ? () => me
    : O((e, r) => {
        let n = 0;
        e.subscribe(
          A(r, (o) => {
            ++n <= t && (r.next(o), t <= n && r.complete());
          }),
        );
      });
}
function hs(t) {
  return N(() => t);
}
function ho(t = lg) {
  return O((e, r) => {
    let n = !1;
    e.subscribe(
      A(
        r,
        (o) => {
          (n = !0), r.next(o);
        },
        () => (n ? r.complete() : r.error(t())),
      ),
    );
  });
}
function lg() {
  return new We();
}
function zn(t) {
  return O((e, r) => {
    try {
      e.subscribe(r);
    } finally {
      r.add(t);
    }
  });
}
function Pe(t, e) {
  let r = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? Te((o, i) => t(o, i, n)) : ge,
      Ze(1),
      r ? st(e) : ho(() => new We()),
    );
}
function cn(t) {
  return t <= 0
    ? () => me
    : O((e, r) => {
        let n = [];
        e.subscribe(
          A(
            r,
            (o) => {
              n.push(o), t < n.length && n.shift();
            },
            () => {
              for (let o of n) r.next(o);
              r.complete();
            },
            void 0,
            () => {
              n = null;
            },
          ),
        );
      });
}
function ps(t, e) {
  let r = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? Te((o, i) => t(o, i, n)) : ge,
      cn(1),
      r ? st(e) : ho(() => new We()),
    );
}
function gs(t, e) {
  return O(tl(t, e, arguments.length >= 2, !0));
}
function ms(...t) {
  let e = ot(t);
  return O((r, n) => {
    (e ? an(t, r, e) : an(t, r)).subscribe(n);
  });
}
function Ae(t, e) {
  return O((r, n) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && n.complete();
    r.subscribe(
      A(
        n,
        (u) => {
          o?.unsubscribe();
          let c = 0,
            l = i++;
          q(t(u, l)).subscribe(
            (o = A(
              n,
              (d) => n.next(e ? e(u, d, l, c++) : d),
              () => {
                (o = null), a();
              },
            )),
          );
        },
        () => {
          (s = !0), a();
        },
      ),
    );
  });
}
function vs(t) {
  return O((e, r) => {
    q(t).subscribe(A(r, () => r.complete(), Hn)), !r.closed && e.subscribe(r);
  });
}
function te(t, e, r) {
  let n = E(t) || e || r ? { next: t, error: e, complete: r } : t;
  return n
    ? O((o, i) => {
        var s;
        (s = n.subscribe) === null || s === void 0 || s.call(n);
        let a = !0;
        o.subscribe(
          A(
            i,
            (u) => {
              var c;
              (c = n.next) === null || c === void 0 || c.call(n, u), i.next(u);
            },
            () => {
              var u;
              (a = !1),
                (u = n.complete) === null || u === void 0 || u.call(n),
                i.complete();
            },
            (u) => {
              var c;
              (a = !1),
                (c = n.error) === null || c === void 0 || c.call(n, u),
                i.error(u);
            },
            () => {
              var u, c;
              a && ((u = n.unsubscribe) === null || u === void 0 || u.call(n)),
                (c = n.finalize) === null || c === void 0 || c.call(n);
            },
          ),
        );
      })
    : ge;
}
var kl = "https://g.co/ng/security#xss",
  y = class extends Error {
    constructor(e, r) {
      super(wa(e, r)), (this.code = e);
    }
  };
function wa(t, e) {
  return `${`NG0${Math.abs(t)}`}${e ? ": " + e : ""}`;
}
function Ho(t) {
  return { toString: t }.toString();
}
var bt = globalThis;
function U(t) {
  for (let e in t) if (t[e] === U) return e;
  throw Error("Could not find renamed property on target object.");
}
function dg(t, e) {
  for (let r in e) e.hasOwnProperty(r) && !t.hasOwnProperty(r) && (t[r] = e[r]);
}
function le(t) {
  if (typeof t == "string") return t;
  if (Array.isArray(t)) return "[" + t.map(le).join(", ") + "]";
  if (t == null) return "" + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let e = t.toString();
  if (e == null) return "" + e;
  let r = e.indexOf(`
`);
  return r === -1 ? e : e.substring(0, r);
}
function nl(t, e) {
  return t == null || t === ""
    ? e === null
      ? ""
      : e
    : e == null || e === ""
      ? t
      : t + " " + e;
}
var fg = U({ __forward_ref__: U });
function En(t) {
  return (
    (t.__forward_ref__ = En),
    (t.toString = function () {
      return le(this());
    }),
    t
  );
}
function ae(t) {
  return Ll(t) ? t() : t;
}
function Ll(t) {
  return (
    typeof t == "function" && t.hasOwnProperty(fg) && t.__forward_ref__ === En
  );
}
function I(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0,
  };
}
function kt(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function zo(t) {
  return rl(t, jl) || rl(t, $l);
}
function Vl(t) {
  return zo(t) !== null;
}
function rl(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null;
}
function hg(t) {
  let e = t && (t[jl] || t[$l]);
  return e || null;
}
function ol(t) {
  return t && (t.hasOwnProperty(il) || t.hasOwnProperty(pg)) ? t[il] : null;
}
var jl = U({ ɵprov: U }),
  il = U({ ɵinj: U }),
  $l = U({ ngInjectableDef: U }),
  pg = U({ ngInjectorDef: U }),
  M = class {
    constructor(e, r) {
      (this._desc = e),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof r == "number"
          ? (this.__NG_ELEMENT_ID__ = r)
          : r !== void 0 &&
            (this.ɵprov = I({
              token: this,
              providedIn: r.providedIn || "root",
              factory: r.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function Ul(t) {
  return t && !!t.ɵproviders;
}
var gg = U({ ɵcmp: U }),
  mg = U({ ɵdir: U }),
  vg = U({ ɵpipe: U }),
  yg = U({ ɵmod: U }),
  Io = U({ ɵfac: U }),
  Gn = U({ __NG_ELEMENT_ID__: U }),
  sl = U({ __NG_ENV_ID__: U });
function Ea(t) {
  return typeof t == "string" ? t : t == null ? "" : String(t);
}
function Dg(t) {
  return typeof t == "function"
    ? t.name || t.toString()
    : typeof t == "object" && t != null && typeof t.type == "function"
      ? t.type.name || t.type.toString()
      : Ea(t);
}
function Cg(t, e) {
  let r = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
  throw new y(-200, t);
}
function Ia(t, e) {
  throw new y(-201, !1);
}
var S = (function (t) {
    return (
      (t[(t.Default = 0)] = "Default"),
      (t[(t.Host = 1)] = "Host"),
      (t[(t.Self = 2)] = "Self"),
      (t[(t.SkipSelf = 4)] = "SkipSelf"),
      (t[(t.Optional = 8)] = "Optional"),
      t
    );
  })(S || {}),
  Rs;
function Bl() {
  return Rs;
}
function Ce(t) {
  let e = Rs;
  return (Rs = t), e;
}
function Hl(t, e, r) {
  let n = zo(t);
  if (n && n.providedIn == "root")
    return n.value === void 0 ? (n.value = n.factory()) : n.value;
  if (r & S.Optional) return null;
  if (e !== void 0) return e;
  Ia(t, "Injector");
}
var wg = {},
  qn = wg,
  Eg = "__NG_DI_FLAG__",
  bo = "ngTempTokenPath",
  Ig = "ngTokenPath",
  bg = /\n/gm,
  Mg = "\u0275",
  al = "__source",
  hn;
function _g() {
  return hn;
}
function at(t) {
  let e = hn;
  return (hn = t), e;
}
function Sg(t, e = S.Default) {
  if (hn === void 0) throw new y(-203, !1);
  return hn === null
    ? Hl(t, void 0, e)
    : hn.get(t, e & S.Optional ? null : void 0, e);
}
function R(t, e = S.Default) {
  return (Bl() || Sg)(ae(t), e);
}
function g(t, e = S.Default) {
  return R(t, Go(e));
}
function Go(t) {
  return typeof t > "u" || typeof t == "number"
    ? t
    : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function Fs(t) {
  let e = [];
  for (let r = 0; r < t.length; r++) {
    let n = ae(t[r]);
    if (Array.isArray(n)) {
      if (n.length === 0) throw new y(900, !1);
      let o,
        i = S.Default;
      for (let s = 0; s < n.length; s++) {
        let a = n[s],
          u = xg(a);
        typeof u == "number" ? (u === -1 ? (o = a.token) : (i |= u)) : (o = a);
      }
      e.push(R(o, i));
    } else e.push(R(n));
  }
  return e;
}
function xg(t) {
  return t[Eg];
}
function Tg(t, e, r, n) {
  let o = t[bo];
  throw (
    (e[al] && o.unshift(e[al]),
    (t.message = Ag(
      `
` + t.message,
      o,
      r,
      n,
    )),
    (t[Ig] = o),
    (t[bo] = null),
    t)
  );
}
function Ag(t, e, r, n = null) {
  t =
    t &&
    t.charAt(0) ===
      `
` &&
    t.charAt(1) == Mg
      ? t.slice(2)
      : t;
  let o = le(e);
  if (Array.isArray(e)) o = e.map(le).join(" -> ");
  else if (typeof e == "object") {
    let i = [];
    for (let s in e)
      if (e.hasOwnProperty(s)) {
        let a = e[s];
        i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : le(a)));
      }
    o = `{${i.join(", ")}}`;
  }
  return `${r}${n ? "(" + n + ")" : ""}[${o}]: ${t.replace(
    bg,
    `
  `,
  )}`;
}
function gn(t, e) {
  let r = t.hasOwnProperty(Io);
  return r ? t[Io] : null;
}
function Ng(t, e, r) {
  if (t.length !== e.length) return !1;
  for (let n = 0; n < t.length; n++) {
    let o = t[n],
      i = e[n];
    if ((r && ((o = r(o)), (i = r(i))), i !== o)) return !1;
  }
  return !0;
}
function Og(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function ba(t, e) {
  t.forEach((r) => (Array.isArray(r) ? ba(r, e) : e(r)));
}
function zl(t, e, r) {
  e >= t.length ? t.push(r) : t.splice(e, 0, r);
}
function Mo(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function Rg(t, e, r, n) {
  let o = t.length;
  if (o == e) t.push(r, n);
  else if (o === 1) t.push(n, t[0]), (t[0] = r);
  else {
    for (o--, t.push(t[o - 1], t[o]); o > e; ) {
      let i = o - 2;
      (t[o] = t[i]), o--;
    }
    (t[e] = r), (t[e + 1] = n);
  }
}
function Fg(t, e, r) {
  let n = or(t, e);
  return n >= 0 ? (t[n | 1] = r) : ((n = ~n), Rg(t, n, e, r)), n;
}
function ys(t, e) {
  let r = or(t, e);
  if (r >= 0) return t[r | 1];
}
function or(t, e) {
  return Pg(t, e, 1);
}
function Pg(t, e, r) {
  let n = 0,
    o = t.length >> r;
  for (; o !== n; ) {
    let i = n + ((o - n) >> 1),
      s = t[i << r];
    if (e === s) return i << r;
    s > e ? (o = i) : (n = i + 1);
  }
  return ~(o << r);
}
var mn = {},
  we = [],
  vn = new M(""),
  Gl = new M("", -1),
  ql = new M(""),
  _o = class {
    get(e, r = qn) {
      if (r === qn) {
        let n = new Error(`NullInjectorError: No provider for ${le(e)}!`);
        throw ((n.name = "NullInjectorError"), n);
      }
      return r;
    }
  },
  Wl = (function (t) {
    return (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t;
  })(Wl || {}),
  Ve = (function (t) {
    return (
      (t[(t.Emulated = 0)] = "Emulated"),
      (t[(t.None = 2)] = "None"),
      (t[(t.ShadowDom = 3)] = "ShadowDom"),
      t
    );
  })(Ve || {}),
  ie = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.SignalBased = 1)] = "SignalBased"),
      (t[(t.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      t
    );
  })(ie || {});
function kg(t, e, r) {
  let n = t.length;
  for (;;) {
    let o = t.indexOf(e, r);
    if (o === -1) return o;
    if (o === 0 || t.charCodeAt(o - 1) <= 32) {
      let i = e.length;
      if (o + i === n || t.charCodeAt(o + i) <= 32) return o;
    }
    r = o + 1;
  }
}
function Ps(t, e, r) {
  let n = 0;
  for (; n < r.length; ) {
    let o = r[n];
    if (typeof o == "number") {
      if (o !== 0) break;
      n++;
      let i = r[n++],
        s = r[n++],
        a = r[n++];
      t.setAttribute(e, s, a, i);
    } else {
      let i = o,
        s = r[++n];
      Lg(i) ? t.setProperty(e, i, s) : t.setAttribute(e, i, s), n++;
    }
  }
  return n;
}
function Zl(t) {
  return t === 3 || t === 4 || t === 6;
}
function Lg(t) {
  return t.charCodeAt(0) === 64;
}
function Wn(t, e) {
  if (!(e === null || e.length === 0))
    if (t === null || t.length === 0) t = e.slice();
    else {
      let r = -1;
      for (let n = 0; n < e.length; n++) {
        let o = e[n];
        typeof o == "number"
          ? (r = o)
          : r === 0 ||
            (r === -1 || r === 2
              ? ul(t, r, o, null, e[++n])
              : ul(t, r, o, null, null));
      }
    }
  return t;
}
function ul(t, e, r, n, o) {
  let i = 0,
    s = t.length;
  if (e === -1) s = -1;
  else
    for (; i < t.length; ) {
      let a = t[i++];
      if (typeof a == "number") {
        if (a === e) {
          s = -1;
          break;
        } else if (a > e) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < t.length; ) {
    let a = t[i];
    if (typeof a == "number") break;
    if (a === r) {
      if (n === null) {
        o !== null && (t[i + 1] = o);
        return;
      } else if (n === t[i + 1]) {
        t[i + 2] = o;
        return;
      }
    }
    i++, n !== null && i++, o !== null && i++;
  }
  s !== -1 && (t.splice(s, 0, e), (i = s + 1)),
    t.splice(i++, 0, r),
    n !== null && t.splice(i++, 0, n),
    o !== null && t.splice(i++, 0, o);
}
var Yl = "ng-template";
function Vg(t, e, r, n) {
  let o = 0;
  if (n) {
    for (; o < e.length && typeof e[o] == "string"; o += 2)
      if (e[o] === "class" && kg(e[o + 1].toLowerCase(), r, 0) !== -1)
        return !0;
  } else if (Ma(t)) return !1;
  if (((o = e.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < e.length && typeof (i = e[o]) == "string"; )
      if (i.toLowerCase() === r) return !0;
  }
  return !1;
}
function Ma(t) {
  return t.type === 4 && t.value !== Yl;
}
function jg(t, e, r) {
  let n = t.type === 4 && !r ? Yl : t.value;
  return e === n;
}
function $g(t, e, r) {
  let n = 4,
    o = t.attrs,
    i = o !== null ? Hg(o) : 0,
    s = !1;
  for (let a = 0; a < e.length; a++) {
    let u = e[a];
    if (typeof u == "number") {
      if (!s && !Ne(n) && !Ne(u)) return !1;
      if (s && Ne(u)) continue;
      (s = !1), (n = u | (n & 1));
      continue;
    }
    if (!s)
      if (n & 4) {
        if (
          ((n = 2 | (n & 1)),
          (u !== "" && !jg(t, u, r)) || (u === "" && e.length === 1))
        ) {
          if (Ne(n)) return !1;
          s = !0;
        }
      } else if (n & 8) {
        if (o === null || !Vg(t, o, u, r)) {
          if (Ne(n)) return !1;
          s = !0;
        }
      } else {
        let c = e[++a],
          l = Ug(u, o, Ma(t), r);
        if (l === -1) {
          if (Ne(n)) return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let d;
          if (
            (l > i ? (d = "") : (d = o[l + 1].toLowerCase()), n & 2 && c !== d)
          ) {
            if (Ne(n)) return !1;
            s = !0;
          }
        }
      }
  }
  return Ne(n) || s;
}
function Ne(t) {
  return (t & 1) === 0;
}
function Ug(t, e, r, n) {
  if (e === null) return -1;
  let o = 0;
  if (n || !r) {
    let i = !1;
    for (; o < e.length; ) {
      let s = e[o];
      if (s === t) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = e[++o];
        for (; typeof a == "string"; ) a = e[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return zg(e, t);
}
function Bg(t, e, r = !1) {
  for (let n = 0; n < e.length; n++) if ($g(t, e[n], r)) return !0;
  return !1;
}
function Hg(t) {
  for (let e = 0; e < t.length; e++) {
    let r = t[e];
    if (Zl(r)) return e;
  }
  return t.length;
}
function zg(t, e) {
  let r = t.indexOf(4);
  if (r > -1)
    for (r++; r < t.length; ) {
      let n = t[r];
      if (typeof n == "number") return -1;
      if (n === e) return r;
      r++;
    }
  return -1;
}
function cl(t, e) {
  return t ? ":not(" + e.trim() + ")" : e;
}
function Gg(t) {
  let e = t[0],
    r = 1,
    n = 2,
    o = "",
    i = !1;
  for (; r < t.length; ) {
    let s = t[r];
    if (typeof s == "string")
      if (n & 2) {
        let a = t[++r];
        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else n & 8 ? (o += "." + s) : n & 4 && (o += " " + s);
    else
      o !== "" && !Ne(s) && ((e += cl(i, o)), (o = "")),
        (n = s),
        (i = i || !Ne(n));
    r++;
  }
  return o !== "" && (e += cl(i, o)), e;
}
function qg(t) {
  return t.map(Gg).join(",");
}
function Wg(t) {
  let e = [],
    r = [],
    n = 1,
    o = 2;
  for (; n < t.length; ) {
    let i = t[n];
    if (typeof i == "string")
      o === 2 ? i !== "" && e.push(i, t[++n]) : o === 8 && r.push(i);
    else {
      if (!Ne(o)) break;
      o = i;
    }
    n++;
  }
  return { attrs: e, classes: r };
}
function Z(t) {
  return Ho(() => {
    let e = ed(t),
      r = $(p({}, e), {
        decls: t.decls,
        vars: t.vars,
        template: t.template,
        consts: t.consts || null,
        ngContentSelectors: t.ngContentSelectors,
        onPush: t.changeDetection === Wl.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (e.standalone && t.dependencies) || null,
        getStandaloneInjector: null,
        signals: t.signals ?? !1,
        data: t.data || {},
        encapsulation: t.encapsulation || Ve.Emulated,
        styles: t.styles || we,
        _: null,
        schemas: t.schemas || null,
        tView: null,
        id: "",
      });
    td(r);
    let n = t.dependencies;
    return (
      (r.directiveDefs = dl(n, !1)), (r.pipeDefs = dl(n, !0)), (r.id = Qg(r)), r
    );
  });
}
function Zg(t) {
  return St(t) || Ql(t);
}
function Yg(t) {
  return t !== null;
}
function Lt(t) {
  return Ho(() => ({
    type: t.type,
    bootstrap: t.bootstrap || we,
    declarations: t.declarations || we,
    imports: t.imports || we,
    exports: t.exports || we,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null,
  }));
}
function ll(t, e) {
  if (t == null) return mn;
  let r = {};
  for (let n in t)
    if (t.hasOwnProperty(n)) {
      let o = t[n],
        i,
        s,
        a = ie.None;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
        : ((i = o), (s = o)),
        e ? ((r[i] = a !== ie.None ? [n, a] : n), (e[i] = s)) : (r[i] = n);
    }
  return r;
}
function fe(t) {
  return Ho(() => {
    let e = ed(t);
    return td(e), e;
  });
}
function St(t) {
  return t[gg] || null;
}
function Ql(t) {
  return t[mg] || null;
}
function Kl(t) {
  return t[vg] || null;
}
function Jl(t) {
  let e = St(t) || Ql(t) || Kl(t);
  return e !== null ? e.standalone : !1;
}
function Xl(t, e) {
  let r = t[yg] || null;
  if (!r && e === !0)
    throw new Error(`Type ${le(t)} does not have '\u0275mod' property.`);
  return r;
}
function ed(t) {
  let e = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: e,
    inputTransforms: null,
    inputConfig: t.inputs || mn,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || we,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: ll(t.inputs, e),
    outputs: ll(t.outputs),
    debugInfo: null,
  };
}
function td(t) {
  t.features?.forEach((e) => e(t));
}
function dl(t, e) {
  if (!t) return null;
  let r = e ? Kl : Zg;
  return () => (typeof t == "function" ? t() : t).map((n) => r(n)).filter(Yg);
}
function Qg(t) {
  let e = 0,
    r = [
      t.selectors,
      t.ngContentSelectors,
      t.hostVars,
      t.hostAttrs,
      t.consts,
      t.vars,
      t.decls,
      t.encapsulation,
      t.standalone,
      t.signals,
      t.exportAs,
      JSON.stringify(t.inputs),
      JSON.stringify(t.outputs),
      Object.getOwnPropertyNames(t.type.prototype),
      !!t.contentQueries,
      !!t.viewQuery,
    ].join("|");
  for (let o of r) e = (Math.imul(31, e) + o.charCodeAt(0)) << 0;
  return (e += 2147483648), "c" + e;
}
function qo(t) {
  return { ɵproviders: t };
}
function Kg(...t) {
  return { ɵproviders: nd(!0, t), ɵfromNgModule: !0 };
}
function nd(t, ...e) {
  let r = [],
    n = new Set(),
    o,
    i = (s) => {
      r.push(s);
    };
  return (
    ba(e, (s) => {
      let a = s;
      ks(a, i, [], n) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && rd(o, i),
    r
  );
}
function rd(t, e) {
  for (let r = 0; r < t.length; r++) {
    let { ngModule: n, providers: o } = t[r];
    _a(o, (i) => {
      e(i, n);
    });
  }
}
function ks(t, e, r, n) {
  if (((t = ae(t)), !t)) return !1;
  let o = null,
    i = ol(t),
    s = !i && St(t);
  if (!i && !s) {
    let u = t.ngModule;
    if (((i = ol(u)), i)) o = u;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = t;
  }
  let a = n.has(o);
  if (s) {
    if (a) return !1;
    if ((n.add(o), s.dependencies)) {
      let u =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let c of u) ks(c, e, r, n);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      n.add(o);
      let c;
      try {
        ba(i.imports, (l) => {
          ks(l, e, r, n) && ((c ||= []), c.push(l));
        });
      } finally {
      }
      c !== void 0 && rd(c, e);
    }
    if (!a) {
      let c = gn(o) || (() => new o());
      e({ provide: o, useFactory: c, deps: we }, o),
        e({ provide: ql, useValue: o, multi: !0 }, o),
        e({ provide: vn, useValue: () => R(o), multi: !0 }, o);
    }
    let u = i.providers;
    if (u != null && !a) {
      let c = t;
      _a(u, (l) => {
        e(l, c);
      });
    }
  } else return !1;
  return o !== t && t.providers !== void 0;
}
function _a(t, e) {
  for (let r of t)
    Ul(r) && (r = r.ɵproviders), Array.isArray(r) ? _a(r, e) : e(r);
}
var Jg = U({ provide: String, useValue: U });
function od(t) {
  return t !== null && typeof t == "object" && Jg in t;
}
function Xg(t) {
  return !!(t && t.useExisting);
}
function em(t) {
  return !!(t && t.useFactory);
}
function yn(t) {
  return typeof t == "function";
}
function tm(t) {
  return !!t.useClass;
}
var Wo = new M(""),
  vo = {},
  nm = {},
  Ds;
function Sa() {
  return Ds === void 0 && (Ds = new _o()), Ds;
}
var Ee = class {},
  Zn = class extends Ee {
    get destroyed() {
      return this._destroyed;
    }
    constructor(e, r, n, o) {
      super(),
        (this.parent = r),
        (this.source = n),
        (this.scopes = o),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Vs(e, (s) => this.processProvider(s)),
        this.records.set(Gl, ln(void 0, this)),
        o.has("environment") && this.records.set(Ee, ln(void 0, this));
      let i = this.records.get(Wo);
      i != null && typeof i.value == "string" && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(ql, we, S.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let e = P(null);
      try {
        for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
        let r = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let n of r) n();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          P(e);
      }
    }
    onDestroy(e) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(e),
        () => this.removeOnDestroy(e)
      );
    }
    runInContext(e) {
      this.assertNotDestroyed();
      let r = at(this),
        n = Ce(void 0),
        o;
      try {
        return e();
      } finally {
        at(r), Ce(n);
      }
    }
    get(e, r = qn, n = S.Default) {
      if ((this.assertNotDestroyed(), e.hasOwnProperty(sl))) return e[sl](this);
      n = Go(n);
      let o,
        i = at(this),
        s = Ce(void 0);
      try {
        if (!(n & S.SkipSelf)) {
          let u = this.records.get(e);
          if (u === void 0) {
            let c = am(e) && zo(e);
            c && this.injectableDefInScope(c)
              ? (u = ln(Ls(e), vo))
              : (u = null),
              this.records.set(e, u);
          }
          if (u != null) return this.hydrate(e, u);
        }
        let a = n & S.Self ? Sa() : this.parent;
        return (r = n & S.Optional && r === qn ? null : r), a.get(e, r);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[bo] = a[bo] || []).unshift(le(e)), i)) throw a;
          return Tg(a, e, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        Ce(s), at(i);
      }
    }
    resolveInjectorInitializers() {
      let e = P(null),
        r = at(this),
        n = Ce(void 0),
        o;
      try {
        let i = this.get(vn, we, S.Self);
        for (let s of i) s();
      } finally {
        at(r), Ce(n), P(e);
      }
    }
    toString() {
      let e = [],
        r = this.records;
      for (let n of r.keys()) e.push(le(n));
      return `R3Injector[${e.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new y(205, !1);
    }
    processProvider(e) {
      e = ae(e);
      let r = yn(e) ? e : ae(e && e.provide),
        n = om(e);
      if (!yn(e) && e.multi === !0) {
        let o = this.records.get(r);
        o ||
          ((o = ln(void 0, vo, !0)),
          (o.factory = () => Fs(o.multi)),
          this.records.set(r, o)),
          (r = e),
          o.multi.push(e);
      }
      this.records.set(r, n);
    }
    hydrate(e, r) {
      let n = P(null);
      try {
        return (
          r.value === vo && ((r.value = nm), (r.value = r.factory())),
          typeof r.value == "object" &&
            r.value &&
            sm(r.value) &&
            this._ngOnDestroyHooks.add(r.value),
          r.value
        );
      } finally {
        P(n);
      }
    }
    injectableDefInScope(e) {
      if (!e.providedIn) return !1;
      let r = ae(e.providedIn);
      return typeof r == "string"
        ? r === "any" || this.scopes.has(r)
        : this.injectorDefTypes.has(r);
    }
    removeOnDestroy(e) {
      let r = this._onDestroyHooks.indexOf(e);
      r !== -1 && this._onDestroyHooks.splice(r, 1);
    }
  };
function Ls(t) {
  let e = zo(t),
    r = e !== null ? e.factory : gn(t);
  if (r !== null) return r;
  if (t instanceof M) throw new y(204, !1);
  if (t instanceof Function) return rm(t);
  throw new y(204, !1);
}
function rm(t) {
  if (t.length > 0) throw new y(204, !1);
  let r = hg(t);
  return r !== null ? () => r.factory(t) : () => new t();
}
function om(t) {
  if (od(t)) return ln(void 0, t.useValue);
  {
    let e = id(t);
    return ln(e, vo);
  }
}
function id(t, e, r) {
  let n;
  if (yn(t)) {
    let o = ae(t);
    return gn(o) || Ls(o);
  } else if (od(t)) n = () => ae(t.useValue);
  else if (em(t)) n = () => t.useFactory(...Fs(t.deps || []));
  else if (Xg(t)) n = () => R(ae(t.useExisting));
  else {
    let o = ae(t && (t.useClass || t.provide));
    if (im(t)) n = () => new o(...Fs(t.deps));
    else return gn(o) || Ls(o);
  }
  return n;
}
function ln(t, e, r = !1) {
  return { factory: t, value: e, multi: r ? [] : void 0 };
}
function im(t) {
  return !!t.deps;
}
function sm(t) {
  return (
    t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function"
  );
}
function am(t) {
  return typeof t == "function" || (typeof t == "object" && t instanceof M);
}
function Vs(t, e) {
  for (let r of t)
    Array.isArray(r) ? Vs(r, e) : r && Ul(r) ? Vs(r.ɵproviders, e) : e(r);
}
function Vt(t, e) {
  t instanceof Zn && t.assertNotDestroyed();
  let r,
    n = at(t),
    o = Ce(void 0);
  try {
    return e();
  } finally {
    at(n), Ce(o);
  }
}
function um() {
  return Bl() !== void 0 || _g() != null;
}
function cm(t) {
  return typeof t == "function";
}
var Je = 0,
  b = 1,
  C = 2,
  ne = 3,
  Oe = 4,
  Fe = 5,
  So = 6,
  Yn = 7,
  je = 8,
  Dn = 9,
  Re = 10,
  se = 11,
  Qn = 12,
  fl = 13,
  ir = 14,
  $e = 15,
  sr = 16,
  dn = 17,
  Ye = 18,
  Zo = 19,
  sd = 20,
  ut = 21,
  Cs = 22,
  xt = 23,
  Ue = 25,
  ad = 1;
var Tt = 7,
  xo = 8,
  Cn = 9,
  de = 10,
  xa = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      t
    );
  })(xa || {});
function Mt(t) {
  return Array.isArray(t) && typeof t[ad] == "object";
}
function Xe(t) {
  return Array.isArray(t) && t[ad] === !0;
}
function ud(t) {
  return (t.flags & 4) !== 0;
}
function Yo(t) {
  return t.componentOffset > -1;
}
function Ta(t) {
  return (t.flags & 1) === 1;
}
function ct(t) {
  return !!t.template;
}
function lm(t) {
  return (t[C] & 512) !== 0;
}
var js = class {
  constructor(e, r, n) {
    (this.previousValue = e), (this.currentValue = r), (this.firstChange = n);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function cd(t, e, r, n) {
  e !== null ? e.applyValueToInputSignal(e, n) : (t[r] = n);
}
function et() {
  return ld;
}
function ld(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = fm), dm;
}
et.ngInherit = !0;
function dm() {
  let t = fd(this),
    e = t?.current;
  if (e) {
    let r = t.previous;
    if (r === mn) t.previous = e;
    else for (let n in e) r[n] = e[n];
    (t.current = null), this.ngOnChanges(e);
  }
}
function fm(t, e, r, n, o) {
  let i = this.declaredInputs[n],
    s = fd(t) || hm(t, { previous: mn, current: null }),
    a = s.current || (s.current = {}),
    u = s.previous,
    c = u[i];
  (a[i] = new js(c && c.currentValue, r, u === mn)), cd(t, e, o, r);
}
var dd = "__ngSimpleChanges__";
function fd(t) {
  return t[dd] || null;
}
function hm(t, e) {
  return (t[dd] = e);
}
var hl = null;
var ke = function (t, e, r) {
    hl?.(t, e, r);
  },
  pm = "svg",
  gm = "math",
  mm = !1;
function vm() {
  return mm;
}
function Be(t) {
  for (; Array.isArray(t); ) t = t[Je];
  return t;
}
function ym(t, e) {
  return Be(e[t]);
}
function Ie(t, e) {
  return Be(e[t.index]);
}
function Aa(t, e) {
  return t.data[e];
}
function dt(t, e) {
  let r = e[t];
  return Mt(r) ? r : r[Je];
}
function Dm(t) {
  return (t[C] & 4) === 4;
}
function Na(t) {
  return (t[C] & 128) === 128;
}
function Cm(t) {
  return Xe(t[ne]);
}
function To(t, e) {
  return e == null ? null : t[e];
}
function hd(t) {
  t[dn] = 0;
}
function wm(t) {
  t[C] & 1024 || ((t[C] |= 1024), Na(t) && Kn(t));
}
function Oa(t) {
  return !!(t[C] & 9216 || t[xt]?.dirty);
}
function $s(t) {
  t[Re].changeDetectionScheduler?.notify(1),
    Oa(t)
      ? Kn(t)
      : t[C] & 64 &&
        (vm()
          ? ((t[C] |= 1024), Kn(t))
          : t[Re].changeDetectionScheduler?.notify());
}
function Kn(t) {
  t[Re].changeDetectionScheduler?.notify();
  let e = Jn(t);
  for (; e !== null && !(e[C] & 8192 || ((e[C] |= 8192), !Na(e))); ) e = Jn(e);
}
function pd(t, e) {
  if ((t[C] & 256) === 256) throw new y(911, !1);
  t[ut] === null && (t[ut] = []), t[ut].push(e);
}
function Em(t, e) {
  if (t[ut] === null) return;
  let r = t[ut].indexOf(e);
  r !== -1 && t[ut].splice(r, 1);
}
function Jn(t) {
  let e = t[ne];
  return Xe(e) ? e[ne] : e;
}
var k = { lFrame: wd(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function Im() {
  return k.lFrame.elementDepthCount;
}
function bm() {
  k.lFrame.elementDepthCount++;
}
function Mm() {
  k.lFrame.elementDepthCount--;
}
function gd() {
  return k.bindingsEnabled;
}
function _m() {
  return k.skipHydrationRootTNode !== null;
}
function Sm(t) {
  return k.skipHydrationRootTNode === t;
}
function xm() {
  k.skipHydrationRootTNode = null;
}
function H() {
  return k.lFrame.lView;
}
function he() {
  return k.lFrame.tView;
}
function pe() {
  let t = md();
  for (; t !== null && t.type === 64; ) t = t.parent;
  return t;
}
function md() {
  return k.lFrame.currentTNode;
}
function Tm() {
  let t = k.lFrame,
    e = t.currentTNode;
  return t.isParent ? e : e.parent;
}
function ar(t, e) {
  let r = k.lFrame;
  (r.currentTNode = t), (r.isParent = e);
}
function vd() {
  return k.lFrame.isParent;
}
function Am() {
  k.lFrame.isParent = !1;
}
function Nm(t) {
  return (k.lFrame.bindingIndex = t);
}
function Ra() {
  return k.lFrame.bindingIndex++;
}
function Om(t) {
  let e = k.lFrame,
    r = e.bindingIndex;
  return (e.bindingIndex = e.bindingIndex + t), r;
}
function Rm() {
  return k.lFrame.inI18n;
}
function Fm(t, e) {
  let r = k.lFrame;
  (r.bindingIndex = r.bindingRootIndex = t), Us(e);
}
function Pm() {
  return k.lFrame.currentDirectiveIndex;
}
function Us(t) {
  k.lFrame.currentDirectiveIndex = t;
}
function km(t) {
  let e = k.lFrame.currentDirectiveIndex;
  return e === -1 ? null : t[e];
}
function yd() {
  return k.lFrame.currentQueryIndex;
}
function Fa(t) {
  k.lFrame.currentQueryIndex = t;
}
function Lm(t) {
  let e = t[b];
  return e.type === 2 ? e.declTNode : e.type === 1 ? t[Fe] : null;
}
function Dd(t, e, r) {
  if (r & S.SkipSelf) {
    let o = e,
      i = t;
    for (; (o = o.parent), o === null && !(r & S.Host); )
      if (((o = Lm(i)), o === null || ((i = i[ir]), o.type & 10))) break;
    if (o === null) return !1;
    (e = o), (t = i);
  }
  let n = (k.lFrame = Cd());
  return (n.currentTNode = e), (n.lView = t), !0;
}
function Pa(t) {
  let e = Cd(),
    r = t[b];
  (k.lFrame = e),
    (e.currentTNode = r.firstChild),
    (e.lView = t),
    (e.tView = r),
    (e.contextLView = t),
    (e.bindingIndex = r.bindingStartIndex),
    (e.inI18n = !1);
}
function Cd() {
  let t = k.lFrame,
    e = t === null ? null : t.child;
  return e === null ? wd(t) : e;
}
function wd(t) {
  let e = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1,
  };
  return t !== null && (t.child = e), e;
}
function Ed() {
  let t = k.lFrame;
  return (k.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var Id = Ed;
function ka() {
  let t = Ed();
  (t.isParent = !0),
    (t.tView = null),
    (t.selectedIndex = -1),
    (t.contextLView = null),
    (t.elementDepthCount = 0),
    (t.currentDirectiveIndex = -1),
    (t.currentNamespace = null),
    (t.bindingRootIndex = -1),
    (t.bindingIndex = -1),
    (t.currentQueryIndex = 0);
}
function ur() {
  return k.lFrame.selectedIndex;
}
function At(t) {
  k.lFrame.selectedIndex = t;
}
function bd() {
  let t = k.lFrame;
  return Aa(t.tView, t.selectedIndex);
}
function Vm() {
  return k.lFrame.currentNamespace;
}
var Md = !0;
function La() {
  return Md;
}
function Va(t) {
  Md = t;
}
function jm(t, e, r) {
  let { ngOnChanges: n, ngOnInit: o, ngDoCheck: i } = e.type.prototype;
  if (n) {
    let s = ld(e);
    (r.preOrderHooks ??= []).push(t, s),
      (r.preOrderCheckHooks ??= []).push(t, s);
  }
  o && (r.preOrderHooks ??= []).push(0 - t, o),
    i &&
      ((r.preOrderHooks ??= []).push(t, i),
      (r.preOrderCheckHooks ??= []).push(t, i));
}
function ja(t, e) {
  for (let r = e.directiveStart, n = e.directiveEnd; r < n; r++) {
    let i = t.data[r].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: u,
        ngAfterViewChecked: c,
        ngOnDestroy: l,
      } = i;
    s && (t.contentHooks ??= []).push(-r, s),
      a &&
        ((t.contentHooks ??= []).push(r, a),
        (t.contentCheckHooks ??= []).push(r, a)),
      u && (t.viewHooks ??= []).push(-r, u),
      c &&
        ((t.viewHooks ??= []).push(r, c), (t.viewCheckHooks ??= []).push(r, c)),
      l != null && (t.destroyHooks ??= []).push(r, l);
  }
}
function yo(t, e, r) {
  _d(t, e, 3, r);
}
function Do(t, e, r, n) {
  (t[C] & 3) === r && _d(t, e, r, n);
}
function ws(t, e) {
  let r = t[C];
  (r & 3) === e && ((r &= 16383), (r += 1), (t[C] = r));
}
function _d(t, e, r, n) {
  let o = n !== void 0 ? t[dn] & 65535 : 0,
    i = n ?? -1,
    s = e.length - 1,
    a = 0;
  for (let u = o; u < s; u++)
    if (typeof e[u + 1] == "number") {
      if (((a = e[u]), n != null && a >= n)) break;
    } else
      e[u] < 0 && (t[dn] += 65536),
        (a < i || i == -1) &&
          ($m(t, r, e, u), (t[dn] = (t[dn] & 4294901760) + u + 2)),
        u++;
}
function pl(t, e) {
  ke(4, t, e);
  let r = P(null);
  try {
    e.call(t);
  } finally {
    P(r), ke(5, t, e);
  }
}
function $m(t, e, r, n) {
  let o = r[n] < 0,
    i = r[n + 1],
    s = o ? -r[n] : r[n],
    a = t[s];
  o
    ? t[C] >> 14 < t[dn] >> 16 &&
      (t[C] & 3) === e &&
      ((t[C] += 16384), pl(a, i))
    : pl(a, i);
}
var pn = -1,
  Nt = class {
    constructor(e, r, n) {
      (this.factory = e),
        (this.resolving = !1),
        (this.canSeeViewProviders = r),
        (this.injectImpl = n);
    }
  };
function Um(t) {
  return t instanceof Nt;
}
function Bm(t) {
  return (t.flags & 8) !== 0;
}
function Hm(t) {
  return (t.flags & 16) !== 0;
}
function Sd(t) {
  return t !== pn;
}
function Ao(t) {
  return t & 32767;
}
function zm(t) {
  return t >> 16;
}
function No(t, e) {
  let r = zm(t),
    n = e;
  for (; r > 0; ) (n = n[ir]), r--;
  return n;
}
var Bs = !0;
function gl(t) {
  let e = Bs;
  return (Bs = t), e;
}
var Gm = 256,
  xd = Gm - 1,
  Td = 5,
  qm = 0,
  Le = {};
function Wm(t, e, r) {
  let n;
  typeof r == "string"
    ? (n = r.charCodeAt(0) || 0)
    : r.hasOwnProperty(Gn) && (n = r[Gn]),
    n == null && (n = r[Gn] = qm++);
  let o = n & xd,
    i = 1 << o;
  e.data[t + (o >> Td)] |= i;
}
function Oo(t, e) {
  let r = Ad(t, e);
  if (r !== -1) return r;
  let n = e[b];
  n.firstCreatePass &&
    ((t.injectorIndex = e.length),
    Es(n.data, t),
    Es(e, null),
    Es(n.blueprint, null));
  let o = $a(t, e),
    i = t.injectorIndex;
  if (Sd(o)) {
    let s = Ao(o),
      a = No(o, e),
      u = a[b].data;
    for (let c = 0; c < 8; c++) e[i + c] = a[s + c] | u[s + c];
  }
  return (e[i + 8] = o), i;
}
function Es(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function Ad(t, e) {
  return t.injectorIndex === -1 ||
    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
    e[t.injectorIndex + 8] === null
    ? -1
    : t.injectorIndex;
}
function $a(t, e) {
  if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
  let r = 0,
    n = null,
    o = e;
  for (; o !== null; ) {
    if (((n = Pd(o)), n === null)) return pn;
    if ((r++, (o = o[ir]), n.injectorIndex !== -1))
      return n.injectorIndex | (r << 16);
  }
  return pn;
}
function Hs(t, e, r) {
  Wm(t, e, r);
}
function Zm(t, e) {
  if (e === "class") return t.classes;
  if (e === "style") return t.styles;
  let r = t.attrs;
  if (r) {
    let n = r.length,
      o = 0;
    for (; o < n; ) {
      let i = r[o];
      if (Zl(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == "number")
        for (o++; o < n && typeof r[o] == "string"; ) o++;
      else {
        if (i === e) return r[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function Nd(t, e, r) {
  if (r & S.Optional || t !== void 0) return t;
  Ia(e, "NodeInjector");
}
function Od(t, e, r, n) {
  if (
    (r & S.Optional && n === void 0 && (n = null), !(r & (S.Self | S.Host)))
  ) {
    let o = t[Dn],
      i = Ce(void 0);
    try {
      return o ? o.get(e, n, r & S.Optional) : Hl(e, n, r & S.Optional);
    } finally {
      Ce(i);
    }
  }
  return Nd(n, e, r);
}
function Rd(t, e, r, n = S.Default, o) {
  if (t !== null) {
    if (e[C] & 2048 && !(n & S.Self)) {
      let s = Jm(t, e, r, n, Le);
      if (s !== Le) return s;
    }
    let i = Fd(t, e, r, n, Le);
    if (i !== Le) return i;
  }
  return Od(e, r, n, o);
}
function Fd(t, e, r, n, o) {
  let i = Qm(r);
  if (typeof i == "function") {
    if (!Dd(e, t, n)) return n & S.Host ? Nd(o, r, n) : Od(e, r, n, o);
    try {
      let s;
      if (((s = i(n)), s == null && !(n & S.Optional))) Ia(r);
      else return s;
    } finally {
      Id();
    }
  } else if (typeof i == "number") {
    let s = null,
      a = Ad(t, e),
      u = pn,
      c = n & S.Host ? e[$e][Fe] : null;
    for (
      (a === -1 || n & S.SkipSelf) &&
      ((u = a === -1 ? $a(t, e) : e[a + 8]),
      u === pn || !vl(n, !1)
        ? (a = -1)
        : ((s = e[b]), (a = Ao(u)), (e = No(u, e))));
      a !== -1;

    ) {
      let l = e[b];
      if (ml(i, a, l.data)) {
        let d = Ym(a, e, r, s, n, c);
        if (d !== Le) return d;
      }
      (u = e[a + 8]),
        u !== pn && vl(n, e[b].data[a + 8] === c) && ml(i, a, e)
          ? ((s = l), (a = Ao(u)), (e = No(u, e)))
          : (a = -1);
    }
  }
  return o;
}
function Ym(t, e, r, n, o, i) {
  let s = e[b],
    a = s.data[t + 8],
    u = n == null ? Yo(a) && Bs : n != s && (a.type & 3) !== 0,
    c = o & S.Host && i === a,
    l = Co(a, s, r, u, c);
  return l !== null ? Ot(e, s, l, a) : Le;
}
function Co(t, e, r, n, o) {
  let i = t.providerIndexes,
    s = e.data,
    a = i & 1048575,
    u = t.directiveStart,
    c = t.directiveEnd,
    l = i >> 20,
    d = n ? a : a + l,
    f = o ? a + l : c;
  for (let h = d; h < f; h++) {
    let m = s[h];
    if ((h < u && r === m) || (h >= u && m.type === r)) return h;
  }
  if (o) {
    let h = s[u];
    if (h && ct(h) && h.type === r) return u;
  }
  return null;
}
function Ot(t, e, r, n) {
  let o = t[r],
    i = e.data;
  if (Um(o)) {
    let s = o;
    s.resolving && Cg(Dg(i[r]));
    let a = gl(s.canSeeViewProviders);
    s.resolving = !0;
    let u,
      c = s.injectImpl ? Ce(s.injectImpl) : null,
      l = Dd(t, n, S.Default);
    try {
      (o = t[r] = s.factory(void 0, i, t, n)),
        e.firstCreatePass && r >= n.directiveStart && jm(r, i[r], e);
    } finally {
      c !== null && Ce(c), gl(a), (s.resolving = !1), Id();
    }
  }
  return o;
}
function Qm(t) {
  if (typeof t == "string") return t.charCodeAt(0) || 0;
  let e = t.hasOwnProperty(Gn) ? t[Gn] : void 0;
  return typeof e == "number" ? (e >= 0 ? e & xd : Km) : e;
}
function ml(t, e, r) {
  let n = 1 << t;
  return !!(r[e + (t >> Td)] & n);
}
function vl(t, e) {
  return !(t & S.Self) && !(t & S.Host && e);
}
var _t = class {
  constructor(e, r) {
    (this._tNode = e), (this._lView = r);
  }
  get(e, r, n) {
    return Rd(this._tNode, this._lView, e, Go(n), r);
  }
};
function Km() {
  return new _t(pe(), H());
}
function cr(t) {
  return Ho(() => {
    let e = t.prototype.constructor,
      r = e[Io] || zs(e),
      n = Object.prototype,
      o = Object.getPrototypeOf(t.prototype).constructor;
    for (; o && o !== n; ) {
      let i = o[Io] || zs(o);
      if (i && i !== r) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function zs(t) {
  return Ll(t)
    ? () => {
        let e = zs(ae(t));
        return e && e();
      }
    : gn(t);
}
function Jm(t, e, r, n, o) {
  let i = t,
    s = e;
  for (; i !== null && s !== null && s[C] & 2048 && !(s[C] & 512); ) {
    let a = Fd(i, s, r, n | S.Self, Le);
    if (a !== Le) return a;
    let u = i.parent;
    if (!u) {
      let c = s[sd];
      if (c) {
        let l = c.get(r, Le, n);
        if (l !== Le) return l;
      }
      (u = Pd(s)), (s = s[ir]);
    }
    i = u;
  }
  return o;
}
function Pd(t) {
  let e = t[b],
    r = e.type;
  return r === 2 ? e.declTNode : r === 1 ? t[Fe] : null;
}
function Ua(t) {
  return Zm(pe(), t);
}
function yl(t, e = null, r = null, n) {
  let o = kd(t, e, r, n);
  return o.resolveInjectorInitializers(), o;
}
function kd(t, e = null, r = null, n, o = new Set()) {
  let i = [r || we, Kg(t)];
  return (
    (n = n || (typeof t == "object" ? void 0 : le(t))),
    new Zn(i, e || Sa(), n || null, o)
  );
}
var In = (() => {
  let e = class e {
    static create(n, o) {
      if (Array.isArray(n)) return yl({ name: "" }, o, n, "");
      {
        let i = n.name ?? "";
        return yl({ name: i }, n.parent, n.providers, i);
      }
    }
  };
  (e.THROW_IF_NOT_FOUND = qn),
    (e.NULL = new _o()),
    (e.ɵprov = I({ token: e, providedIn: "any", factory: () => R(Gl) })),
    (e.__NG_ELEMENT_ID__ = -1);
  let t = e;
  return t;
})();
var Xm = "ngOriginalError";
function Is(t) {
  return t[Xm];
}
var Qe = class {
    constructor() {
      this._console = console;
    }
    handleError(e) {
      let r = this._findOriginalError(e);
      this._console.error("ERROR", e),
        r && this._console.error("ORIGINAL ERROR", r);
    }
    _findOriginalError(e) {
      let r = e && Is(e);
      for (; r && Is(r); ) r = Is(r);
      return r || null;
    }
  },
  Ld = new M("", {
    providedIn: "root",
    factory: () => g(Qe).handleError.bind(void 0),
  }),
  Vd = (() => {
    let e = class e {};
    (e.__NG_ELEMENT_ID__ = ev), (e.__NG_ENV_ID__ = (n) => n);
    let t = e;
    return t;
  })(),
  Gs = class extends Vd {
    constructor(e) {
      super(), (this._lView = e);
    }
    onDestroy(e) {
      return pd(this._lView, e), () => Em(this._lView, e);
    }
  };
function ev() {
  return new Gs(H());
}
function tv() {
  return bn(pe(), H());
}
function bn(t, e) {
  return new be(Ie(t, e));
}
var be = (() => {
  let e = class e {
    constructor(n) {
      this.nativeElement = n;
    }
  };
  e.__NG_ELEMENT_ID__ = tv;
  let t = e;
  return t;
})();
function nv(t) {
  return t instanceof be ? t.nativeElement : t;
}
var qs = class extends oe {
  constructor(e = !1) {
    super(),
      (this.destroyRef = void 0),
      (this.__isAsync = e),
      um() && (this.destroyRef = g(Vd, { optional: !0 }) ?? void 0);
  }
  emit(e) {
    let r = P(null);
    try {
      super.next(e);
    } finally {
      P(r);
    }
  }
  subscribe(e, r, n) {
    let o = e,
      i = r || (() => null),
      s = n;
    if (e && typeof e == "object") {
      let u = e;
      (o = u.next?.bind(u)), (i = u.error?.bind(u)), (s = u.complete?.bind(u));
    }
    this.__isAsync && ((i = bs(i)), o && (o = bs(o)), s && (s = bs(s)));
    let a = super.subscribe({ next: o, error: i, complete: s });
    return e instanceof Q && e.add(a), a;
  }
};
function bs(t) {
  return (e) => {
    setTimeout(t, void 0, e);
  };
}
var X = qs;
function rv() {
  return this._results[Symbol.iterator]();
}
var Ws = class t {
  get changes() {
    return (this._changes ??= new X());
  }
  constructor(e = !1) {
    (this._emitDistinctChangesOnly = e),
      (this.dirty = !0),
      (this._onDirty = void 0),
      (this._results = []),
      (this._changesDetected = !1),
      (this._changes = void 0),
      (this.length = 0),
      (this.first = void 0),
      (this.last = void 0);
    let r = t.prototype;
    r[Symbol.iterator] || (r[Symbol.iterator] = rv);
  }
  get(e) {
    return this._results[e];
  }
  map(e) {
    return this._results.map(e);
  }
  filter(e) {
    return this._results.filter(e);
  }
  find(e) {
    return this._results.find(e);
  }
  reduce(e, r) {
    return this._results.reduce(e, r);
  }
  forEach(e) {
    this._results.forEach(e);
  }
  some(e) {
    return this._results.some(e);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(e, r) {
    this.dirty = !1;
    let n = Og(e);
    (this._changesDetected = !Ng(this._results, n, r)) &&
      ((this._results = n),
      (this.length = n.length),
      (this.last = n[this.length - 1]),
      (this.first = n[0]));
  }
  notifyOnChanges() {
    this._changes !== void 0 &&
      (this._changesDetected || !this._emitDistinctChangesOnly) &&
      this._changes.emit(this);
  }
  onDirty(e) {
    this._onDirty = e;
  }
  setDirty() {
    (this.dirty = !0), this._onDirty?.();
  }
  destroy() {
    this._changes !== void 0 &&
      (this._changes.complete(), this._changes.unsubscribe());
  }
};
function jd(t) {
  return (t.flags & 128) === 128;
}
var $d = new Map(),
  ov = 0;
function iv() {
  return ov++;
}
function sv(t) {
  $d.set(t[Zo], t);
}
function av(t) {
  $d.delete(t[Zo]);
}
var Dl = "__ngContext__";
function Rt(t, e) {
  Mt(e) ? ((t[Dl] = e[Zo]), sv(e)) : (t[Dl] = e);
}
function Ud(t) {
  return Hd(t[Qn]);
}
function Bd(t) {
  return Hd(t[Oe]);
}
function Hd(t) {
  for (; t !== null && !Xe(t); ) t = t[Oe];
  return t;
}
var Zs;
function zd(t) {
  Zs = t;
}
function uv() {
  if (Zs !== void 0) return Zs;
  if (typeof document < "u") return document;
  throw new y(210, !1);
}
var Ba = new M("", { providedIn: "root", factory: () => cv }),
  cv = "ng",
  Ha = new M(""),
  Mn = new M("", { providedIn: "platform", factory: () => "unknown" });
var za = new M("", {
  providedIn: "root",
  factory: () =>
    uv().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
var lv = "h",
  dv = "b";
var fv = () => null;
function Ga(t, e, r = !1) {
  return fv(t, e, r);
}
var Gd = !1,
  hv = new M("", { providedIn: "root", factory: () => Gd });
var po;
function pv() {
  if (po === void 0 && ((po = null), bt.trustedTypes))
    try {
      po = bt.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (t) => t,
        createScript: (t) => t,
        createScriptURL: (t) => t,
      });
    } catch {}
  return po;
}
function Cl(t) {
  return pv()?.createScriptURL(t) || t;
}
var Ro = class {
  constructor(e) {
    this.changingThisBreaksApplicationSecurity = e;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${kl})`;
  }
};
function lr(t) {
  return t instanceof Ro ? t.changingThisBreaksApplicationSecurity : t;
}
function qa(t, e) {
  let r = gv(t);
  if (r != null && r !== e) {
    if (r === "ResourceURL" && e === "URL") return !0;
    throw new Error(`Required a safe ${e}, got a ${r} (see ${kl})`);
  }
  return r === e;
}
function gv(t) {
  return (t instanceof Ro && t.getTypeName()) || null;
}
var mv = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function qd(t) {
  return (t = String(t)), t.match(mv) ? t : "unsafe:" + t;
}
var Qo = (function (t) {
  return (
    (t[(t.NONE = 0)] = "NONE"),
    (t[(t.HTML = 1)] = "HTML"),
    (t[(t.STYLE = 2)] = "STYLE"),
    (t[(t.SCRIPT = 3)] = "SCRIPT"),
    (t[(t.URL = 4)] = "URL"),
    (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    t
  );
})(Qo || {});
function vv(t) {
  let e = Zd();
  return e ? e.sanitize(Qo.URL, t) || "" : qa(t, "URL") ? lr(t) : qd(Ea(t));
}
function yv(t) {
  let e = Zd();
  if (e) return Cl(e.sanitize(Qo.RESOURCE_URL, t) || "");
  if (qa(t, "ResourceURL")) return Cl(lr(t));
  throw new y(904, !1);
}
function Dv(t, e) {
  return (e === "src" &&
    (t === "embed" ||
      t === "frame" ||
      t === "iframe" ||
      t === "media" ||
      t === "script")) ||
    (e === "href" && (t === "base" || t === "link"))
    ? yv
    : vv;
}
function Wd(t, e, r) {
  return Dv(e, r)(t);
}
function Zd() {
  let t = H();
  return t && t[Re].sanitizer;
}
function Yd(t) {
  return t instanceof Function ? t() : t;
}
var Ke = (function (t) {
    return (
      (t[(t.Important = 1)] = "Important"),
      (t[(t.DashCase = 2)] = "DashCase"),
      t
    );
  })(Ke || {}),
  Cv;
function Wa(t, e) {
  return Cv(t, e);
}
function fn(t, e, r, n, o) {
  if (n != null) {
    let i,
      s = !1;
    Xe(n) ? (i = n) : Mt(n) && ((s = !0), (n = n[Je]));
    let a = Be(n);
    t === 0 && r !== null
      ? o == null
        ? Xd(e, r, a)
        : Po(e, r, a, o || null, !0)
      : t === 1 && r !== null
        ? Po(e, r, a, o || null, !0)
        : t === 2
          ? kv(e, a, s)
          : t === 3 && e.destroyNode(a),
      i != null && Vv(e, t, i, r, o);
  }
}
function wv(t, e) {
  return t.createText(e);
}
function Qd(t, e, r) {
  return t.createElement(e, r);
}
function Ev(t, e) {
  Kd(t, e), (e[Je] = null), (e[Fe] = null);
}
function Iv(t, e, r, n, o, i) {
  (n[Je] = o), (n[Fe] = e), Ko(t, n, r, 1, o, i);
}
function Kd(t, e) {
  e[Re].changeDetectionScheduler?.notify(1), Ko(t, e, e[se], 2, null, null);
}
function bv(t) {
  let e = t[Qn];
  if (!e) return Ms(t[b], t);
  for (; e; ) {
    let r = null;
    if (Mt(e)) r = e[Qn];
    else {
      let n = e[de];
      n && (r = n);
    }
    if (!r) {
      for (; e && !e[Oe] && e !== t; ) Mt(e) && Ms(e[b], e), (e = e[ne]);
      e === null && (e = t), Mt(e) && Ms(e[b], e), (r = e && e[Oe]);
    }
    e = r;
  }
}
function Mv(t, e, r, n) {
  let o = de + n,
    i = r.length;
  n > 0 && (r[o - 1][Oe] = e),
    n < i - de
      ? ((e[Oe] = r[o]), zl(r, de + n, e))
      : (r.push(e), (e[Oe] = null)),
    (e[ne] = r);
  let s = e[sr];
  s !== null && r !== s && _v(s, e);
  let a = e[Ye];
  a !== null && a.insertView(t), $s(e), (e[C] |= 128);
}
function _v(t, e) {
  let r = t[Cn],
    o = e[ne][ne][$e];
  e[$e] !== o && (t[C] |= xa.HasTransplantedViews),
    r === null ? (t[Cn] = [e]) : r.push(e);
}
function Jd(t, e) {
  let r = t[Cn],
    n = r.indexOf(e);
  r.splice(n, 1);
}
function Fo(t, e) {
  if (t.length <= de) return;
  let r = de + e,
    n = t[r];
  if (n) {
    let o = n[sr];
    o !== null && o !== t && Jd(o, n), e > 0 && (t[r - 1][Oe] = n[Oe]);
    let i = Mo(t, de + e);
    Ev(n[b], n);
    let s = i[Ye];
    s !== null && s.detachView(i[b]),
      (n[ne] = null),
      (n[Oe] = null),
      (n[C] &= -129);
  }
  return n;
}
function Za(t, e) {
  if (!(e[C] & 256)) {
    let r = e[se];
    r.destroyNode && Ko(t, e, r, 3, null, null), bv(e);
  }
}
function Ms(t, e) {
  if (e[C] & 256) return;
  let r = P(null);
  try {
    (e[C] &= -129),
      (e[C] |= 256),
      e[xt] && Ec(e[xt]),
      xv(t, e),
      Sv(t, e),
      e[b].type === 1 && e[se].destroy();
    let n = e[sr];
    if (n !== null && Xe(e[ne])) {
      n !== e[ne] && Jd(n, e);
      let o = e[Ye];
      o !== null && o.detachView(t);
    }
    av(e);
  } finally {
    P(r);
  }
}
function Sv(t, e) {
  let r = t.cleanup,
    n = e[Yn];
  if (r !== null)
    for (let i = 0; i < r.length - 1; i += 2)
      if (typeof r[i] == "string") {
        let s = r[i + 3];
        s >= 0 ? n[s]() : n[-s].unsubscribe(), (i += 2);
      } else {
        let s = n[r[i + 1]];
        r[i].call(s);
      }
  n !== null && (e[Yn] = null);
  let o = e[ut];
  if (o !== null) {
    e[ut] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s();
    }
  }
}
function xv(t, e) {
  let r;
  if (t != null && (r = t.destroyHooks) != null)
    for (let n = 0; n < r.length; n += 2) {
      let o = e[r[n]];
      if (!(o instanceof Nt)) {
        let i = r[n + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              u = i[s + 1];
            ke(4, a, u);
            try {
              u.call(a);
            } finally {
              ke(5, a, u);
            }
          }
        else {
          ke(4, o, i);
          try {
            i.call(o);
          } finally {
            ke(5, o, i);
          }
        }
      }
    }
}
function Tv(t, e, r) {
  return Av(t, e.parent, r);
}
function Av(t, e, r) {
  let n = e;
  for (; n !== null && n.type & 40; ) (e = n), (n = e.parent);
  if (n === null) return r[Je];
  {
    let { componentOffset: o } = n;
    if (o > -1) {
      let { encapsulation: i } = t.data[n.directiveStart + o];
      if (i === Ve.None || i === Ve.Emulated) return null;
    }
    return Ie(n, r);
  }
}
function Po(t, e, r, n, o) {
  t.insertBefore(e, r, n, o);
}
function Xd(t, e, r) {
  t.appendChild(e, r);
}
function wl(t, e, r, n, o) {
  n !== null ? Po(t, e, r, n, o) : Xd(t, e, r);
}
function Nv(t, e, r, n) {
  t.removeChild(e, r, n);
}
function Ya(t, e) {
  return t.parentNode(e);
}
function Ov(t, e) {
  return t.nextSibling(e);
}
function Rv(t, e, r) {
  return Pv(t, e, r);
}
function Fv(t, e, r) {
  return t.type & 40 ? Ie(t, r) : null;
}
var Pv = Fv,
  El;
function Qa(t, e, r, n) {
  let o = Tv(t, n, e),
    i = e[se],
    s = n.parent || e[Fe],
    a = Rv(s, n, e);
  if (o != null)
    if (Array.isArray(r))
      for (let u = 0; u < r.length; u++) wl(i, o, r[u], a, !1);
    else wl(i, o, r, a, !1);
  El !== void 0 && El(i, n, e, r, o);
}
function wo(t, e) {
  if (e !== null) {
    let r = e.type;
    if (r & 3) return Ie(e, t);
    if (r & 4) return Ys(-1, t[e.index]);
    if (r & 8) {
      let n = e.child;
      if (n !== null) return wo(t, n);
      {
        let o = t[e.index];
        return Xe(o) ? Ys(-1, o) : Be(o);
      }
    } else {
      if (r & 32) return Wa(e, t)() || Be(t[e.index]);
      {
        let n = ef(t, e);
        if (n !== null) {
          if (Array.isArray(n)) return n[0];
          let o = Jn(t[$e]);
          return wo(o, n);
        } else return wo(t, e.next);
      }
    }
  }
  return null;
}
function ef(t, e) {
  if (e !== null) {
    let n = t[$e][Fe],
      o = e.projection;
    return n.projection[o];
  }
  return null;
}
function Ys(t, e) {
  let r = de + t + 1;
  if (r < e.length) {
    let n = e[r],
      o = n[b].firstChild;
    if (o !== null) return wo(n, o);
  }
  return e[Tt];
}
function kv(t, e, r) {
  let n = Ya(t, e);
  n && Nv(t, n, e, r);
}
function Ka(t, e, r, n, o, i, s) {
  for (; r != null; ) {
    let a = n[r.index],
      u = r.type;
    if (
      (s && e === 0 && (a && Rt(Be(a), n), (r.flags |= 2)),
      (r.flags & 32) !== 32)
    )
      if (u & 8) Ka(t, e, r.child, n, o, i, !1), fn(e, t, o, a, i);
      else if (u & 32) {
        let c = Wa(r, n),
          l;
        for (; (l = c()); ) fn(e, t, o, l, i);
        fn(e, t, o, a, i);
      } else u & 16 ? Lv(t, e, n, r, o, i) : fn(e, t, o, a, i);
    r = s ? r.projectionNext : r.next;
  }
}
function Ko(t, e, r, n, o, i) {
  Ka(r, n, t.firstChild, e, o, i, !1);
}
function Lv(t, e, r, n, o, i) {
  let s = r[$e],
    u = s[Fe].projection[n.projection];
  if (Array.isArray(u))
    for (let c = 0; c < u.length; c++) {
      let l = u[c];
      fn(e, t, o, l, i);
    }
  else {
    let c = u,
      l = s[ne];
    jd(n) && (c.flags |= 128), Ka(t, e, c, l, o, i, !0);
  }
}
function Vv(t, e, r, n, o) {
  let i = r[Tt],
    s = Be(r);
  i !== s && fn(e, t, n, i, o);
  for (let a = de; a < r.length; a++) {
    let u = r[a];
    Ko(u[b], u, t, e, n, i);
  }
}
function jv(t, e, r, n, o) {
  if (e) o ? t.addClass(r, n) : t.removeClass(r, n);
  else {
    let i = n.indexOf("-") === -1 ? void 0 : Ke.DashCase;
    o == null
      ? t.removeStyle(r, n, i)
      : (typeof o == "string" &&
          o.endsWith("!important") &&
          ((o = o.slice(0, -10)), (i |= Ke.Important)),
        t.setStyle(r, n, o, i));
  }
}
function $v(t, e, r) {
  t.setAttribute(e, "style", r);
}
function tf(t, e, r) {
  r === "" ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", r);
}
function nf(t, e, r) {
  let { mergedAttrs: n, classes: o, styles: i } = r;
  n !== null && Ps(t, e, n),
    o !== null && tf(t, e, o),
    i !== null && $v(t, e, i);
}
var Jo = {};
function jt(t = 1) {
  rf(he(), H(), ur() + t, !1);
}
function rf(t, e, r, n) {
  if (!n)
    if ((e[C] & 3) === 3) {
      let i = t.preOrderCheckHooks;
      i !== null && yo(e, i, r);
    } else {
      let i = t.preOrderHooks;
      i !== null && Do(e, i, 0, r);
    }
  At(r);
}
function x(t, e = S.Default) {
  let r = H();
  if (r === null) return R(t, e);
  let n = pe();
  return Rd(n, r, ae(t), e);
}
function of(t, e, r, n, o, i) {
  let s = P(null);
  try {
    let a = null;
    o & ie.SignalBased && (a = e[n][rt]),
      a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
      o & ie.HasDecoratorInputTransform &&
        (i = t.inputTransforms[n].call(e, i)),
      t.setInput !== null ? t.setInput(e, a, i, r, n) : cd(e, a, n, i);
  } finally {
    P(s);
  }
}
function Uv(t, e) {
  let r = t.hostBindingOpCodes;
  if (r !== null)
    try {
      for (let n = 0; n < r.length; n++) {
        let o = r[n];
        if (o < 0) At(~o);
        else {
          let i = o,
            s = r[++n],
            a = r[++n];
          Fm(s, i);
          let u = e[i];
          a(2, u);
        }
      }
    } finally {
      At(-1);
    }
}
function Xo(t, e, r, n, o, i, s, a, u, c, l) {
  let d = e.blueprint.slice();
  return (
    (d[Je] = o),
    (d[C] = n | 4 | 128 | 8 | 64),
    (c !== null || (t && t[C] & 2048)) && (d[C] |= 2048),
    hd(d),
    (d[ne] = d[ir] = t),
    (d[je] = r),
    (d[Re] = s || (t && t[Re])),
    (d[se] = a || (t && t[se])),
    (d[Dn] = u || (t && t[Dn]) || null),
    (d[Fe] = i),
    (d[Zo] = iv()),
    (d[So] = l),
    (d[sd] = c),
    (d[$e] = e.type == 2 ? t[$e] : d),
    d
  );
}
function ei(t, e, r, n, o) {
  let i = t.data[e];
  if (i === null) (i = Bv(t, e, r, n, o)), Rm() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = r), (i.value = n), (i.attrs = o);
    let s = Tm();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return ar(i, !0), i;
}
function Bv(t, e, r, n, o) {
  let i = md(),
    s = vd(),
    a = s ? i : i && i.parent,
    u = (t.data[e] = Zv(t, a, r, e, n, o));
  return (
    t.firstChild === null && (t.firstChild = u),
    i !== null &&
      (s
        ? i.child == null && u.parent !== null && (i.child = u)
        : i.next === null && ((i.next = u), (u.prev = i))),
    u
  );
}
function sf(t, e, r, n) {
  if (r === 0) return -1;
  let o = e.length;
  for (let i = 0; i < r; i++) e.push(n), t.blueprint.push(n), t.data.push(null);
  return o;
}
function af(t, e, r, n, o) {
  let i = ur(),
    s = n & 2;
  try {
    At(-1), s && e.length > Ue && rf(t, e, Ue, !1), ke(s ? 2 : 0, o), r(n, o);
  } finally {
    At(i), ke(s ? 3 : 1, o);
  }
}
function uf(t, e, r) {
  if (ud(e)) {
    let n = P(null);
    try {
      let o = e.directiveStart,
        i = e.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = t.data[s];
        if (a.contentQueries) {
          let u = r[s];
          a.contentQueries(1, u, s);
        }
      }
    } finally {
      P(n);
    }
  }
}
function cf(t, e, r) {
  gd() && (ty(t, e, r, Ie(r, e)), (r.flags & 64) === 64 && pf(t, e, r));
}
function lf(t, e, r = Ie) {
  let n = e.localNames;
  if (n !== null) {
    let o = e.index + 1;
    for (let i = 0; i < n.length; i += 2) {
      let s = n[i + 1],
        a = s === -1 ? r(e, t) : t[s];
      t[o++] = a;
    }
  }
}
function df(t) {
  let e = t.tView;
  return e === null || e.incompleteFirstPass
    ? (t.tView = Ja(
        1,
        null,
        t.template,
        t.decls,
        t.vars,
        t.directiveDefs,
        t.pipeDefs,
        t.viewQuery,
        t.schemas,
        t.consts,
        t.id,
      ))
    : e;
}
function Ja(t, e, r, n, o, i, s, a, u, c, l) {
  let d = Ue + n,
    f = d + o,
    h = Hv(d, f),
    m = typeof c == "function" ? c() : c;
  return (h[b] = {
    type: t,
    blueprint: h,
    template: r,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: u,
    consts: m,
    incompleteFirstPass: !1,
    ssrId: l,
  });
}
function Hv(t, e) {
  let r = [];
  for (let n = 0; n < e; n++) r.push(n < t ? null : Jo);
  return r;
}
function zv(t, e, r, n) {
  let i = n.get(hv, Gd) || r === Ve.ShadowDom,
    s = t.selectRootElement(e, i);
  return Gv(s), s;
}
function Gv(t) {
  qv(t);
}
var qv = () => null;
function Wv(t, e, r, n) {
  let o = vf(e);
  o.push(r), t.firstCreatePass && yf(t).push(n, o.length - 1);
}
function Zv(t, e, r, n, o, i) {
  let s = e ? e.injectorIndex : -1,
    a = 0;
  return (
    _m() && (a |= 128),
    {
      type: r,
      index: n,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: e,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function Il(t, e, r, n, o) {
  for (let i in e) {
    if (!e.hasOwnProperty(i)) continue;
    let s = e[i];
    if (s === void 0) continue;
    n ??= {};
    let a,
      u = ie.None;
    Array.isArray(s) ? ((a = s[0]), (u = s[1])) : (a = s);
    let c = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      c = o[i];
    }
    t === 0 ? bl(n, r, c, a, u) : bl(n, r, c, a);
  }
  return n;
}
function bl(t, e, r, n, o) {
  let i;
  t.hasOwnProperty(r) ? (i = t[r]).push(e, n) : (i = t[r] = [e, n]),
    o !== void 0 && i.push(o);
}
function Yv(t, e, r) {
  let n = e.directiveStart,
    o = e.directiveEnd,
    i = t.data,
    s = e.attrs,
    a = [],
    u = null,
    c = null;
  for (let l = n; l < o; l++) {
    let d = i[l],
      f = r ? r.get(d) : null,
      h = f ? f.inputs : null,
      m = f ? f.outputs : null;
    (u = Il(0, d.inputs, l, u, h)), (c = Il(1, d.outputs, l, c, m));
    let T = u !== null && s !== null && !Ma(e) ? fy(u, l, s) : null;
    a.push(T);
  }
  u !== null &&
    (u.hasOwnProperty("class") && (e.flags |= 8),
    u.hasOwnProperty("style") && (e.flags |= 16)),
    (e.initialInputs = a),
    (e.inputs = u),
    (e.outputs = c);
}
function Qv(t) {
  return t === "class"
    ? "className"
    : t === "for"
      ? "htmlFor"
      : t === "formaction"
        ? "formAction"
        : t === "innerHtml"
          ? "innerHTML"
          : t === "readonly"
            ? "readOnly"
            : t === "tabindex"
              ? "tabIndex"
              : t;
}
function Kv(t, e, r, n, o, i, s, a) {
  let u = Ie(e, r),
    c = e.inputs,
    l;
  !a && c != null && (l = c[n])
    ? (Xa(t, r, l, n, o), Yo(e) && Jv(r, e.index))
    : e.type & 3
      ? ((n = Qv(n)),
        (o = s != null ? s(o, e.value || "", n) : o),
        i.setProperty(u, n, o))
      : e.type & 12;
}
function Jv(t, e) {
  let r = dt(e, t);
  r[C] & 16 || (r[C] |= 64);
}
function ff(t, e, r, n) {
  if (gd()) {
    let o = n === null ? null : { "": -1 },
      i = ry(t, r),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i),
      s !== null && hf(t, e, r, s, o, a),
      o && oy(r, n, o);
  }
  r.mergedAttrs = Wn(r.mergedAttrs, r.attrs);
}
function hf(t, e, r, n, o, i) {
  for (let c = 0; c < n.length; c++) Hs(Oo(r, e), t, n[c].type);
  sy(r, t.data.length, n.length);
  for (let c = 0; c < n.length; c++) {
    let l = n[c];
    l.providersResolver && l.providersResolver(l);
  }
  let s = !1,
    a = !1,
    u = sf(t, e, n.length, null);
  for (let c = 0; c < n.length; c++) {
    let l = n[c];
    (r.mergedAttrs = Wn(r.mergedAttrs, l.hostAttrs)),
      ay(t, r, e, u, l),
      iy(u, l, o),
      l.contentQueries !== null && (r.flags |= 4),
      (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) &&
        (r.flags |= 64);
    let d = l.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((t.preOrderHooks ??= []).push(r.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((t.preOrderCheckHooks ??= []).push(r.index), (a = !0)),
      u++;
  }
  Yv(t, r, i);
}
function Xv(t, e, r, n, o) {
  let i = o.hostBindings;
  if (i) {
    let s = t.hostBindingOpCodes;
    s === null && (s = t.hostBindingOpCodes = []);
    let a = ~e.index;
    ey(s) != a && s.push(a), s.push(r, n, i);
  }
}
function ey(t) {
  let e = t.length;
  for (; e > 0; ) {
    let r = t[--e];
    if (typeof r == "number" && r < 0) return r;
  }
  return 0;
}
function ty(t, e, r, n) {
  let o = r.directiveStart,
    i = r.directiveEnd;
  Yo(r) && uy(e, r, t.data[o + r.componentOffset]),
    t.firstCreatePass || Oo(r, e),
    Rt(n, e);
  let s = r.initialInputs;
  for (let a = o; a < i; a++) {
    let u = t.data[a],
      c = Ot(e, t, a, r);
    if ((Rt(c, e), s !== null && dy(e, a - o, c, u, r, s), ct(u))) {
      let l = dt(r.index, e);
      l[je] = Ot(e, t, a, r);
    }
  }
}
function pf(t, e, r) {
  let n = r.directiveStart,
    o = r.directiveEnd,
    i = r.index,
    s = Pm();
  try {
    At(i);
    for (let a = n; a < o; a++) {
      let u = t.data[a],
        c = e[a];
      Us(a),
        (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) &&
          ny(u, c);
    }
  } finally {
    At(-1), Us(s);
  }
}
function ny(t, e) {
  t.hostBindings !== null && t.hostBindings(1, e);
}
function ry(t, e) {
  let r = t.directiveRegistry,
    n = null,
    o = null;
  if (r)
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      if (Bg(e, s.selectors, !1))
        if ((n || (n = []), ct(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()),
              s.findHostDirectiveDefs(s, a, o),
              n.unshift(...a, s);
            let u = a.length;
            Qs(t, e, u);
          } else n.unshift(s), Qs(t, e, 0);
        else
          (o = o || new Map()), s.findHostDirectiveDefs?.(s, n, o), n.push(s);
    }
  return n === null ? null : [n, o];
}
function Qs(t, e, r) {
  (e.componentOffset = r), (t.components ??= []).push(e.index);
}
function oy(t, e, r) {
  if (e) {
    let n = (t.localNames = []);
    for (let o = 0; o < e.length; o += 2) {
      let i = r[e[o + 1]];
      if (i == null) throw new y(-301, !1);
      n.push(e[o], i);
    }
  }
}
function iy(t, e, r) {
  if (r) {
    if (e.exportAs)
      for (let n = 0; n < e.exportAs.length; n++) r[e.exportAs[n]] = t;
    ct(e) && (r[""] = t);
  }
}
function sy(t, e, r) {
  (t.flags |= 1),
    (t.directiveStart = e),
    (t.directiveEnd = e + r),
    (t.providerIndexes = e);
}
function ay(t, e, r, n, o) {
  t.data[n] = o;
  let i = o.factory || (o.factory = gn(o.type, !0)),
    s = new Nt(i, ct(o), x);
  (t.blueprint[n] = s), (r[n] = s), Xv(t, e, n, sf(t, r, o.hostVars, Jo), o);
}
function uy(t, e, r) {
  let n = Ie(e, t),
    o = df(r),
    i = t[Re].rendererFactory,
    s = 16;
  r.signals ? (s = 4096) : r.onPush && (s = 64);
  let a = ti(
    t,
    Xo(t, o, null, s, n, e, null, i.createRenderer(n, r), null, null, null),
  );
  t[e.index] = a;
}
function cy(t, e, r, n, o, i) {
  let s = Ie(t, e);
  ly(e[se], s, i, t.value, r, n, o);
}
function ly(t, e, r, n, o, i, s) {
  if (i == null) t.removeAttribute(e, o, r);
  else {
    let a = s == null ? Ea(i) : s(i, n || "", o);
    t.setAttribute(e, o, a, r);
  }
}
function dy(t, e, r, n, o, i) {
  let s = i[e];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let u = s[a++],
        c = s[a++],
        l = s[a++],
        d = s[a++];
      of(n, r, u, c, l, d);
    }
}
function fy(t, e, r) {
  let n = null,
    o = 0;
  for (; o < r.length; ) {
    let i = r[o];
    if (i === 0) {
      o += 4;
      continue;
    } else if (i === 5) {
      o += 2;
      continue;
    }
    if (typeof i == "number") break;
    if (t.hasOwnProperty(i)) {
      n === null && (n = []);
      let s = t[i];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === e) {
          n.push(i, s[a + 1], s[a + 2], r[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return n;
}
function gf(t, e, r, n) {
  return [t, !0, 0, e, null, n, null, r, null, null];
}
function mf(t, e) {
  let r = t.contentQueries;
  if (r !== null) {
    let n = P(null);
    try {
      for (let o = 0; o < r.length; o += 2) {
        let i = r[o],
          s = r[o + 1];
        if (s !== -1) {
          let a = t.data[s];
          Fa(i), a.contentQueries(2, e[s], s);
        }
      }
    } finally {
      P(n);
    }
  }
}
function ti(t, e) {
  return t[Qn] ? (t[fl][Oe] = e) : (t[Qn] = e), (t[fl] = e), e;
}
function Ks(t, e, r) {
  Fa(0);
  let n = P(null);
  try {
    e(t, r);
  } finally {
    P(n);
  }
}
function vf(t) {
  return t[Yn] || (t[Yn] = []);
}
function yf(t) {
  return t.cleanup || (t.cleanup = []);
}
function Df(t, e) {
  let r = t[Dn],
    n = r ? r.get(Qe, null) : null;
  n && n.handleError(e);
}
function Xa(t, e, r, n, o) {
  for (let i = 0; i < r.length; ) {
    let s = r[i++],
      a = r[i++],
      u = r[i++],
      c = e[s],
      l = t.data[s];
    of(l, c, n, a, u, o);
  }
}
function hy(t, e) {
  let r = dt(e, t),
    n = r[b];
  py(n, r);
  let o = r[Je];
  o !== null && r[So] === null && (r[So] = Ga(o, r[Dn])), eu(n, r, r[je]);
}
function py(t, e) {
  for (let r = e.length; r < t.blueprint.length; r++) e.push(t.blueprint[r]);
}
function eu(t, e, r) {
  Pa(e);
  try {
    let n = t.viewQuery;
    n !== null && Ks(1, n, r);
    let o = t.template;
    o !== null && af(t, e, o, 1, r),
      t.firstCreatePass && (t.firstCreatePass = !1),
      e[Ye]?.finishViewCreation(t),
      t.staticContentQueries && mf(t, e),
      t.staticViewQueries && Ks(2, t.viewQuery, r);
    let i = t.components;
    i !== null && gy(e, i);
  } catch (n) {
    throw (
      (t.firstCreatePass &&
        ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
      n)
    );
  } finally {
    (e[C] &= -5), ka();
  }
}
function gy(t, e) {
  for (let r = 0; r < e.length; r++) hy(t, e[r]);
}
function Cf(t, e, r, n) {
  let o = P(null);
  try {
    let i = e.tView,
      a = t[C] & 4096 ? 4096 : 16,
      u = Xo(
        t,
        i,
        r,
        a,
        null,
        e,
        null,
        null,
        n?.injector ?? null,
        n?.embeddedViewInjector ?? null,
        n?.dehydratedView ?? null,
      ),
      c = t[e.index];
    u[sr] = c;
    let l = t[Ye];
    return l !== null && (u[Ye] = l.createEmbeddedView(i)), eu(i, u, r), u;
  } finally {
    P(o);
  }
}
function my(t, e) {
  let r = de + e;
  if (r < t.length) return t[r];
}
function Js(t, e) {
  return !e || e.firstChild === null || jd(t);
}
function wf(t, e, r, n = !0) {
  let o = e[b];
  if ((Mv(o, e, t, r), n)) {
    let s = Ys(r, t),
      a = e[se],
      u = Ya(a, t[Tt]);
    u !== null && Iv(o, t[Fe], a, e, u, s);
  }
  let i = e[So];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function vy(t, e) {
  let r = Fo(t, e);
  return r !== void 0 && Za(r[b], r), r;
}
function ko(t, e, r, n, o = !1) {
  for (; r !== null; ) {
    let i = e[r.index];
    i !== null && n.push(Be(i)), Xe(i) && yy(i, n);
    let s = r.type;
    if (s & 8) ko(t, e, r.child, n);
    else if (s & 32) {
      let a = Wa(r, e),
        u;
      for (; (u = a()); ) n.push(u);
    } else if (s & 16) {
      let a = ef(e, r);
      if (Array.isArray(a)) n.push(...a);
      else {
        let u = Jn(e[$e]);
        ko(u[b], u, a, n, !0);
      }
    }
    r = o ? r.projectionNext : r.next;
  }
  return n;
}
function yy(t, e) {
  for (let r = de; r < t.length; r++) {
    let n = t[r],
      o = n[b].firstChild;
    o !== null && ko(n[b], n, o, e);
  }
  t[Tt] !== t[Je] && e.push(t[Tt]);
}
var Ef = [];
function Dy(t) {
  return t[xt] ?? Cy(t);
}
function Cy(t) {
  let e = Ef.pop() ?? Object.create(Ey);
  return (e.lView = t), e;
}
function wy(t) {
  t.lView[xt] !== t && ((t.lView = null), Ef.push(t));
}
var Ey = $(p({}, Ur), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
      Kn(t.lView);
    },
    consumerOnSignalRead() {
      this.lView[xt] = this;
    },
  }),
  If = 100;
function bf(t, e = !0, r = 0) {
  let n = t[Re],
    o = n.rendererFactory,
    i = !1;
  i || o.begin?.();
  try {
    Iy(t, r);
  } catch (s) {
    throw (e && Df(t, s), s);
  } finally {
    i || (o.end?.(), n.inlineEffectRunner?.flush());
  }
}
function Iy(t, e) {
  Xs(t, e);
  let r = 0;
  for (; Oa(t); ) {
    if (r === If) throw new y(103, !1);
    r++, Xs(t, 1);
  }
}
function by(t, e, r, n) {
  let o = e[C];
  if ((o & 256) === 256) return;
  let i = !1;
  !i && e[Re].inlineEffectRunner?.flush(), Pa(e);
  let s = null,
    a = null;
  !i && My(t) && ((a = Dy(e)), (s = Ji(a)));
  try {
    hd(e), Nm(t.bindingStartIndex), r !== null && af(t, e, r, 2, n);
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let d = t.preOrderCheckHooks;
        d !== null && yo(e, d, null);
      } else {
        let d = t.preOrderHooks;
        d !== null && Do(e, d, 0, null), ws(e, 0);
      }
    if ((_y(e), Mf(e, 0), t.contentQueries !== null && mf(t, e), !i))
      if (u) {
        let d = t.contentCheckHooks;
        d !== null && yo(e, d);
      } else {
        let d = t.contentHooks;
        d !== null && Do(e, d, 1), ws(e, 1);
      }
    Uv(t, e);
    let c = t.components;
    c !== null && Sf(e, c, 0);
    let l = t.viewQuery;
    if ((l !== null && Ks(2, l, n), !i))
      if (u) {
        let d = t.viewCheckHooks;
        d !== null && yo(e, d);
      } else {
        let d = t.viewHooks;
        d !== null && Do(e, d, 2), ws(e, 2);
      }
    if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[Cs])) {
      for (let d of e[Cs]) d();
      e[Cs] = null;
    }
    i || (e[C] &= -73);
  } catch (u) {
    throw (Kn(e), u);
  } finally {
    a !== null && (Xi(a, s), wy(a)), ka();
  }
}
function My(t) {
  return t.type !== 2;
}
function Mf(t, e) {
  for (let r = Ud(t); r !== null; r = Bd(r))
    for (let n = de; n < r.length; n++) {
      let o = r[n];
      _f(o, e);
    }
}
function _y(t) {
  for (let e = Ud(t); e !== null; e = Bd(e)) {
    if (!(e[C] & xa.HasTransplantedViews)) continue;
    let r = e[Cn];
    for (let n = 0; n < r.length; n++) {
      let o = r[n],
        i = o[ne];
      wm(o);
    }
  }
}
function Sy(t, e, r) {
  let n = dt(e, t);
  _f(n, r);
}
function _f(t, e) {
  Na(t) && Xs(t, e);
}
function Xs(t, e) {
  let n = t[b],
    o = t[C],
    i = t[xt],
    s = !!(e === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && e === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && es(i))),
    i && (i.dirty = !1),
    (t[C] &= -9217),
    s)
  )
    by(n, t, n.template, t[je]);
  else if (o & 8192) {
    Mf(t, 1);
    let a = n.components;
    a !== null && Sf(t, a, 1);
  }
}
function Sf(t, e, r) {
  for (let n = 0; n < e.length; n++) Sy(t, e[n], r);
}
function tu(t) {
  for (t[Re].changeDetectionScheduler?.notify(); t; ) {
    t[C] |= 64;
    let e = Jn(t);
    if (lm(t) && !e) return t;
    t = e;
  }
  return null;
}
var Ft = class {
    get rootNodes() {
      let e = this._lView,
        r = e[b];
      return ko(r, e, r.firstChild, []);
    }
    constructor(e, r, n = !0) {
      (this._lView = e),
        (this._cdRefInjectingView = r),
        (this.notifyErrorHandler = n),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[je];
    }
    set context(e) {
      this._lView[je] = e;
    }
    get destroyed() {
      return (this._lView[C] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let e = this._lView[ne];
        if (Xe(e)) {
          let r = e[xo],
            n = r ? r.indexOf(this) : -1;
          n > -1 && (Fo(e, n), Mo(r, n));
        }
        this._attachedToViewContainer = !1;
      }
      Za(this._lView[b], this._lView);
    }
    onDestroy(e) {
      pd(this._lView, e);
    }
    markForCheck() {
      tu(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[C] &= -129;
    }
    reattach() {
      $s(this._lView), (this._lView[C] |= 128);
    }
    detectChanges() {
      (this._lView[C] |= 1024), bf(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new y(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), Kd(this._lView[b], this._lView);
    }
    attachToAppRef(e) {
      if (this._attachedToViewContainer) throw new y(902, !1);
      (this._appRef = e), $s(this._lView);
    }
  },
  Xn = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = Ay;
    let t = e;
    return t;
  })(),
  xy = Xn,
  Ty = class extends xy {
    constructor(e, r, n) {
      super(),
        (this._declarationLView = e),
        (this._declarationTContainer = r),
        (this.elementRef = n);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(e, r) {
      return this.createEmbeddedViewImpl(e, r);
    }
    createEmbeddedViewImpl(e, r, n) {
      let o = Cf(this._declarationLView, this._declarationTContainer, e, {
        embeddedViewInjector: r,
        dehydratedView: n,
      });
      return new Ft(o);
    }
  };
function Ay() {
  return nu(pe(), H());
}
function nu(t, e) {
  return t.type & 4 ? new Ty(e, t, bn(t, e)) : null;
}
var dx = new RegExp(`^(\\d+)*(${dv}|${lv})*(.*)`);
var Ny = () => null;
function ea(t, e) {
  return Ny(t, e);
}
var ta = class {},
  na = class {},
  Lo = class {};
function Oy(t) {
  let e = Error(`No component factory found for ${le(t)}.`);
  return (e[Ry] = t), e;
}
var Ry = "ngComponent";
var ra = class {
    resolveComponentFactory(e) {
      throw Oy(e);
    }
  },
  ni = (() => {
    let e = class e {};
    e.NULL = new ra();
    let t = e;
    return t;
  })(),
  er = class {},
  ft = (() => {
    let e = class e {
      constructor() {
        this.destroyNode = null;
      }
    };
    e.__NG_ELEMENT_ID__ = () => Fy();
    let t = e;
    return t;
  })();
function Fy() {
  let t = H(),
    e = pe(),
    r = dt(e.index, t);
  return (Mt(r) ? r : t)[se];
}
var Py = (() => {
    let e = class e {};
    e.ɵprov = I({ token: e, providedIn: "root", factory: () => null });
    let t = e;
    return t;
  })(),
  _s = {};
var Ml = new Set();
function dr(t) {
  Ml.has(t) ||
    (Ml.add(t),
    performance?.mark?.("mark_feature_usage", { detail: { feature: t } }));
}
function _l(...t) {}
function ky() {
  let t = typeof bt.requestAnimationFrame == "function",
    e = bt[t ? "requestAnimationFrame" : "setTimeout"],
    r = bt[t ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && e && r) {
    let n = e[Zone.__symbol__("OriginalDelegate")];
    n && (e = n);
    let o = r[Zone.__symbol__("OriginalDelegate")];
    o && (r = o);
  }
  return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: r };
}
var W = class t {
    constructor({
      enableLongStackTrace: e = !1,
      shouldCoalesceEventChangeDetection: r = !1,
      shouldCoalesceRunChangeDetection: n = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new X(!1)),
        (this.onMicrotaskEmpty = new X(!1)),
        (this.onStable = new X(!1)),
        (this.onError = new X(!1)),
        typeof Zone > "u")
      )
        throw new y(908, !1);
      Zone.assertZonePatched();
      let o = this;
      (o._nesting = 0),
        (o._outer = o._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
        e &&
          Zone.longStackTraceZoneSpec &&
          (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
        (o.shouldCoalesceEventChangeDetection = !n && r),
        (o.shouldCoalesceRunChangeDetection = n),
        (o.lastRequestAnimationFrameId = -1),
        (o.nativeRequestAnimationFrame = ky().nativeRequestAnimationFrame),
        jy(o);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0;
    }
    static assertInAngularZone() {
      if (!t.isInAngularZone()) throw new y(909, !1);
    }
    static assertNotInAngularZone() {
      if (t.isInAngularZone()) throw new y(909, !1);
    }
    run(e, r, n) {
      return this._inner.run(e, r, n);
    }
    runTask(e, r, n, o) {
      let i = this._inner,
        s = i.scheduleEventTask("NgZoneEvent: " + o, e, Ly, _l, _l);
      try {
        return i.runTask(s, r, n);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(e, r, n) {
      return this._inner.runGuarded(e, r, n);
    }
    runOutsideAngular(e) {
      return this._outer.run(e);
    }
  },
  Ly = {};
function ru(t) {
  if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
    try {
      t._nesting++, t.onMicrotaskEmpty.emit(null);
    } finally {
      if ((t._nesting--, !t.hasPendingMicrotasks))
        try {
          t.runOutsideAngular(() => t.onStable.emit(null));
        } finally {
          t.isStable = !0;
        }
    }
}
function Vy(t) {
  t.isCheckStableRunning ||
    t.lastRequestAnimationFrameId !== -1 ||
    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
      bt,
      () => {
        t.fakeTopEventTask ||
          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
            "fakeTopEventTask",
            () => {
              (t.lastRequestAnimationFrameId = -1),
                oa(t),
                (t.isCheckStableRunning = !0),
                ru(t),
                (t.isCheckStableRunning = !1);
            },
            void 0,
            () => {},
            () => {},
          )),
          t.fakeTopEventTask.invoke();
      },
    )),
    oa(t));
}
function jy(t) {
  let e = () => {
    Vy(t);
  };
  t._inner = t._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: (r, n, o, i, s, a) => {
      if ($y(a)) return r.invokeTask(o, i, s, a);
      try {
        return Sl(t), r.invokeTask(o, i, s, a);
      } finally {
        ((t.shouldCoalesceEventChangeDetection && i.type === "eventTask") ||
          t.shouldCoalesceRunChangeDetection) &&
          e(),
          xl(t);
      }
    },
    onInvoke: (r, n, o, i, s, a, u) => {
      try {
        return Sl(t), r.invoke(o, i, s, a, u);
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), xl(t);
      }
    },
    onHasTask: (r, n, o, i) => {
      r.hasTask(o, i),
        n === o &&
          (i.change == "microTask"
            ? ((t._hasPendingMicrotasks = i.microTask), oa(t), ru(t))
            : i.change == "macroTask" &&
              (t.hasPendingMacrotasks = i.macroTask));
    },
    onHandleError: (r, n, o, i) => (
      r.handleError(o, i), t.runOutsideAngular(() => t.onError.emit(i)), !1
    ),
  });
}
function oa(t) {
  t._hasPendingMicrotasks ||
  ((t.shouldCoalesceEventChangeDetection ||
    t.shouldCoalesceRunChangeDetection) &&
    t.lastRequestAnimationFrameId !== -1)
    ? (t.hasPendingMicrotasks = !0)
    : (t.hasPendingMicrotasks = !1);
}
function Sl(t) {
  t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function xl(t) {
  t._nesting--, ru(t);
}
function $y(t) {
  return !Array.isArray(t) || t.length !== 1
    ? !1
    : t[0].data?.__ignore_ng_zone__ === !0;
}
var xf = (() => {
  let e = class e {
    constructor() {
      (this.handler = null), (this.internalCallbacks = []);
    }
    execute() {
      this.executeInternalCallbacks(), this.handler?.execute();
    }
    executeInternalCallbacks() {
      let n = [...this.internalCallbacks];
      this.internalCallbacks.length = 0;
      for (let o of n) o();
    }
    ngOnDestroy() {
      this.handler?.destroy(),
        (this.handler = null),
        (this.internalCallbacks.length = 0);
    }
  };
  e.ɵprov = I({ token: e, providedIn: "root", factory: () => new e() });
  let t = e;
  return t;
})();
function ia(t, e, r) {
  let n = r ? t.styles : null,
    o = r ? t.classes : null,
    i = 0;
  if (e !== null)
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if (typeof a == "number") i = a;
      else if (i == 1) o = nl(o, a);
      else if (i == 2) {
        let u = a,
          c = e[++s];
        n = nl(n, u + ": " + c + ";");
      }
    }
  r ? (t.styles = n) : (t.stylesWithoutHost = n),
    r ? (t.classes = o) : (t.classesWithoutHost = o);
}
var Vo = class extends ni {
  constructor(e) {
    super(), (this.ngModule = e);
  }
  resolveComponentFactory(e) {
    let r = St(e);
    return new tr(r, this.ngModule);
  }
};
function Tl(t) {
  let e = [];
  for (let r in t) {
    if (!t.hasOwnProperty(r)) continue;
    let n = t[r];
    n !== void 0 &&
      e.push({ propName: Array.isArray(n) ? n[0] : n, templateName: r });
  }
  return e;
}
function Uy(t) {
  let e = t.toLowerCase();
  return e === "svg" ? pm : e === "math" ? gm : null;
}
var sa = class {
    constructor(e, r) {
      (this.injector = e), (this.parentInjector = r);
    }
    get(e, r, n) {
      n = Go(n);
      let o = this.injector.get(e, _s, n);
      return o !== _s || r === _s ? o : this.parentInjector.get(e, r, n);
    }
  },
  tr = class extends Lo {
    get inputs() {
      let e = this.componentDef,
        r = e.inputTransforms,
        n = Tl(e.inputs);
      if (r !== null)
        for (let o of n)
          r.hasOwnProperty(o.propName) && (o.transform = r[o.propName]);
      return n;
    }
    get outputs() {
      return Tl(this.componentDef.outputs);
    }
    constructor(e, r) {
      super(),
        (this.componentDef = e),
        (this.ngModule = r),
        (this.componentType = e.type),
        (this.selector = qg(e.selectors)),
        (this.ngContentSelectors = e.ngContentSelectors
          ? e.ngContentSelectors
          : []),
        (this.isBoundToModule = !!r);
    }
    create(e, r, n, o) {
      let i = P(null);
      try {
        o = o || this.ngModule;
        let s = o instanceof Ee ? o : o?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new sa(e, s) : e,
          u = a.get(er, null);
        if (u === null) throw new y(407, !1);
        let c = a.get(Py, null),
          l = a.get(xf, null),
          d = a.get(ta, null),
          f = {
            rendererFactory: u,
            sanitizer: c,
            inlineEffectRunner: null,
            afterRenderEventManager: l,
            changeDetectionScheduler: d,
          },
          h = u.createRenderer(null, this.componentDef),
          m = this.componentDef.selectors[0][0] || "div",
          T = n
            ? zv(h, n, this.componentDef.encapsulation, a)
            : Qd(h, m, Uy(m)),
          z = 512;
        this.componentDef.signals
          ? (z |= 4096)
          : this.componentDef.onPush || (z |= 16);
        let L = null;
        T !== null && (L = Ga(T, a, !0));
        let Ge = Ja(0, null, null, 1, 0, null, null, null, null, null, null),
          ue = Xo(null, Ge, null, z, null, null, f, h, a, null, L);
        Pa(ue);
        let qe, Zt;
        try {
          let Se = this.componentDef,
            Yt,
            Zi = null;
          Se.findHostDirectiveDefs
            ? ((Yt = []),
              (Zi = new Map()),
              Se.findHostDirectiveDefs(Se, Yt, Zi),
              Yt.push(Se))
            : (Yt = [Se]);
          let Np = By(ue, T),
            Op = Hy(Np, T, Se, Yt, ue, f, h);
          (Zt = Aa(Ge, Ue)),
            T && qy(h, Se, T, n),
            r !== void 0 && Wy(Zt, this.ngContentSelectors, r),
            (qe = Gy(Op, Se, Yt, Zi, ue, [Zy])),
            eu(Ge, ue, null);
        } finally {
          ka();
        }
        return new aa(this.componentType, qe, bn(Zt, ue), ue, Zt);
      } finally {
        P(i);
      }
    }
  },
  aa = class extends na {
    constructor(e, r, n, o, i) {
      super(),
        (this.location = n),
        (this._rootLView = o),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = r),
        (this.hostView = this.changeDetectorRef = new Ft(o, void 0, !1)),
        (this.componentType = e);
    }
    setInput(e, r) {
      let n = this._tNode.inputs,
        o;
      if (n !== null && (o = n[e])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(e) &&
            Object.is(this.previousInputValues.get(e), r))
        )
          return;
        let i = this._rootLView;
        Xa(i[b], i, o, e, r), this.previousInputValues.set(e, r);
        let s = dt(this._tNode.index, i);
        tu(s);
      }
    }
    get injector() {
      return new _t(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(e) {
      this.hostView.onDestroy(e);
    }
  };
function By(t, e) {
  let r = t[b],
    n = Ue;
  return (t[n] = e), ei(r, n, 2, "#host", null);
}
function Hy(t, e, r, n, o, i, s) {
  let a = o[b];
  zy(n, t, e, s);
  let u = null;
  e !== null && (u = Ga(e, o[Dn]));
  let c = i.rendererFactory.createRenderer(e, r),
    l = 16;
  r.signals ? (l = 4096) : r.onPush && (l = 64);
  let d = Xo(o, df(r), null, l, o[t.index], t, i, c, null, null, u);
  return (
    a.firstCreatePass && Qs(a, t, n.length - 1), ti(o, d), (o[t.index] = d)
  );
}
function zy(t, e, r, n) {
  for (let o of t) e.mergedAttrs = Wn(e.mergedAttrs, o.hostAttrs);
  e.mergedAttrs !== null &&
    (ia(e, e.mergedAttrs, !0), r !== null && nf(n, r, e));
}
function Gy(t, e, r, n, o, i) {
  let s = pe(),
    a = o[b],
    u = Ie(s, o);
  hf(a, o, s, r, null, n);
  for (let l = 0; l < r.length; l++) {
    let d = s.directiveStart + l,
      f = Ot(o, a, d, s);
    Rt(f, o);
  }
  pf(a, o, s), u && Rt(u, o);
  let c = Ot(o, a, s.directiveStart + s.componentOffset, s);
  if (((t[je] = o[je] = c), i !== null)) for (let l of i) l(c, e);
  return uf(a, s, o), c;
}
function qy(t, e, r, n) {
  if (n) Ps(t, r, ["ng-version", "17.3.6"]);
  else {
    let { attrs: o, classes: i } = Wg(e.selectors[0]);
    o && Ps(t, r, o), i && i.length > 0 && tf(t, r, i.join(" "));
  }
}
function Wy(t, e, r) {
  let n = (t.projection = []);
  for (let o = 0; o < e.length; o++) {
    let i = r[o];
    n.push(i != null ? Array.from(i) : null);
  }
}
function Zy() {
  let t = pe();
  ja(H()[b], t);
}
var _n = (() => {
  let e = class e {};
  e.__NG_ELEMENT_ID__ = Yy;
  let t = e;
  return t;
})();
function Yy() {
  let t = pe();
  return Af(t, H());
}
var Qy = _n,
  Tf = class extends Qy {
    constructor(e, r, n) {
      super(),
        (this._lContainer = e),
        (this._hostTNode = r),
        (this._hostLView = n);
    }
    get element() {
      return bn(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new _t(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let e = $a(this._hostTNode, this._hostLView);
      if (Sd(e)) {
        let r = No(e, this._hostLView),
          n = Ao(e),
          o = r[b].data[n + 8];
        return new _t(o, r);
      } else return new _t(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(e) {
      let r = Al(this._lContainer);
      return (r !== null && r[e]) || null;
    }
    get length() {
      return this._lContainer.length - de;
    }
    createEmbeddedView(e, r, n) {
      let o, i;
      typeof n == "number"
        ? (o = n)
        : n != null && ((o = n.index), (i = n.injector));
      let s = ea(this._lContainer, e.ssrId),
        a = e.createEmbeddedViewImpl(r || {}, i, s);
      return this.insertImpl(a, o, Js(this._hostTNode, s)), a;
    }
    createComponent(e, r, n, o, i) {
      let s = e && !cm(e),
        a;
      if (s) a = r;
      else {
        let m = r || {};
        (a = m.index),
          (n = m.injector),
          (o = m.projectableNodes),
          (i = m.environmentInjector || m.ngModuleRef);
      }
      let u = s ? e : new tr(St(e)),
        c = n || this.parentInjector;
      if (!i && u.ngModule == null) {
        let T = (s ? c : this.parentInjector).get(Ee, null);
        T && (i = T);
      }
      let l = St(u.componentType ?? {}),
        d = ea(this._lContainer, l?.id ?? null),
        f = d?.firstChild ?? null,
        h = u.create(c, o, f, i);
      return this.insertImpl(h.hostView, a, Js(this._hostTNode, d)), h;
    }
    insert(e, r) {
      return this.insertImpl(e, r, !0);
    }
    insertImpl(e, r, n) {
      let o = e._lView;
      if (Cm(o)) {
        let a = this.indexOf(e);
        if (a !== -1) this.detach(a);
        else {
          let u = o[ne],
            c = new Tf(u, u[Fe], u[ne]);
          c.detach(c.indexOf(e));
        }
      }
      let i = this._adjustIndex(r),
        s = this._lContainer;
      return wf(s, o, i, n), e.attachToViewContainerRef(), zl(Ss(s), i, e), e;
    }
    move(e, r) {
      return this.insert(e, r);
    }
    indexOf(e) {
      let r = Al(this._lContainer);
      return r !== null ? r.indexOf(e) : -1;
    }
    remove(e) {
      let r = this._adjustIndex(e, -1),
        n = Fo(this._lContainer, r);
      n && (Mo(Ss(this._lContainer), r), Za(n[b], n));
    }
    detach(e) {
      let r = this._adjustIndex(e, -1),
        n = Fo(this._lContainer, r);
      return n && Mo(Ss(this._lContainer), r) != null ? new Ft(n) : null;
    }
    _adjustIndex(e, r = 0) {
      return e ?? this.length + r;
    }
  };
function Al(t) {
  return t[xo];
}
function Ss(t) {
  return t[xo] || (t[xo] = []);
}
function Af(t, e) {
  let r,
    n = e[t.index];
  return (
    Xe(n) ? (r = n) : ((r = gf(n, e, null, t)), (e[t.index] = r), ti(e, r)),
    Jy(r, e, t, n),
    new Tf(r, t, e)
  );
}
function Ky(t, e) {
  let r = t[se],
    n = r.createComment(""),
    o = Ie(e, t),
    i = Ya(r, o);
  return Po(r, i, n, Ov(r, o), !1), n;
}
var Jy = tD,
  Xy = () => !1;
function eD(t, e, r) {
  return Xy(t, e, r);
}
function tD(t, e, r, n) {
  if (t[Tt]) return;
  let o;
  r.type & 8 ? (o = Be(n)) : (o = Ky(e, r)), (t[Tt] = o);
}
var ua = class t {
    constructor(e) {
      (this.queryList = e), (this.matches = null);
    }
    clone() {
      return new t(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  ca = class t {
    constructor(e = []) {
      this.queries = e;
    }
    createEmbeddedView(e) {
      let r = e.queries;
      if (r !== null) {
        let n = e.contentQueries !== null ? e.contentQueries[0] : r.length,
          o = [];
        for (let i = 0; i < n; i++) {
          let s = r.getByIndex(i),
            a = this.queries[s.indexInDeclarationView];
          o.push(a.clone());
        }
        return new t(o);
      }
      return null;
    }
    insertView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    detachView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    finishViewCreation(e) {
      this.dirtyQueriesWithMatches(e);
    }
    dirtyQueriesWithMatches(e) {
      for (let r = 0; r < this.queries.length; r++)
        ou(e, r).matches !== null && this.queries[r].setDirty();
    }
  },
  jo = class {
    constructor(e, r, n = null) {
      (this.flags = r),
        (this.read = n),
        typeof e == "string" ? (this.predicate = cD(e)) : (this.predicate = e);
    }
  },
  la = class t {
    constructor(e = []) {
      this.queries = e;
    }
    elementStart(e, r) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementStart(e, r);
    }
    elementEnd(e) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].elementEnd(e);
    }
    embeddedTView(e) {
      let r = null;
      for (let n = 0; n < this.length; n++) {
        let o = r !== null ? r.length : 0,
          i = this.getByIndex(n).embeddedTView(e, o);
        i &&
          ((i.indexInDeclarationView = n), r !== null ? r.push(i) : (r = [i]));
      }
      return r !== null ? new t(r) : null;
    }
    template(e, r) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].template(e, r);
    }
    getByIndex(e) {
      return this.queries[e];
    }
    get length() {
      return this.queries.length;
    }
    track(e) {
      this.queries.push(e);
    }
  },
  da = class t {
    constructor(e, r = -1) {
      (this.metadata = e),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = r);
    }
    elementStart(e, r) {
      this.isApplyingToNode(r) && this.matchTNode(e, r);
    }
    elementEnd(e) {
      this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
    }
    template(e, r) {
      this.elementStart(e, r);
    }
    embeddedTView(e, r) {
      return this.isApplyingToNode(e)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-e.index, r),
          new t(this.metadata))
        : null;
    }
    isApplyingToNode(e) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let r = this._declarationNodeIndex,
          n = e.parent;
        for (; n !== null && n.type & 8 && n.index !== r; ) n = n.parent;
        return r === (n !== null ? n.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(e, r) {
      let n = this.metadata.predicate;
      if (Array.isArray(n))
        for (let o = 0; o < n.length; o++) {
          let i = n[o];
          this.matchTNodeWithReadOption(e, r, nD(r, i)),
            this.matchTNodeWithReadOption(e, r, Co(r, e, i, !1, !1));
        }
      else
        n === Xn
          ? r.type & 4 && this.matchTNodeWithReadOption(e, r, -1)
          : this.matchTNodeWithReadOption(e, r, Co(r, e, n, !1, !1));
    }
    matchTNodeWithReadOption(e, r, n) {
      if (n !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === be || o === _n || (o === Xn && r.type & 4))
            this.addMatch(r.index, -2);
          else {
            let i = Co(r, e, o, !1, !1);
            i !== null && this.addMatch(r.index, i);
          }
        else this.addMatch(r.index, n);
      }
    }
    addMatch(e, r) {
      this.matches === null ? (this.matches = [e, r]) : this.matches.push(e, r);
    }
  };
function nD(t, e) {
  let r = t.localNames;
  if (r !== null) {
    for (let n = 0; n < r.length; n += 2) if (r[n] === e) return r[n + 1];
  }
  return null;
}
function rD(t, e) {
  return t.type & 11 ? bn(t, e) : t.type & 4 ? nu(t, e) : null;
}
function oD(t, e, r, n) {
  return r === -1 ? rD(e, t) : r === -2 ? iD(t, e, n) : Ot(t, t[b], r, e);
}
function iD(t, e, r) {
  if (r === be) return bn(e, t);
  if (r === Xn) return nu(e, t);
  if (r === _n) return Af(e, t);
}
function Nf(t, e, r, n) {
  let o = e[Ye].queries[n];
  if (o.matches === null) {
    let i = t.data,
      s = r.matches,
      a = [];
    for (let u = 0; s !== null && u < s.length; u += 2) {
      let c = s[u];
      if (c < 0) a.push(null);
      else {
        let l = i[c];
        a.push(oD(e, l, s[u + 1], r.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function fa(t, e, r, n) {
  let o = t.queries.getByIndex(r),
    i = o.matches;
  if (i !== null) {
    let s = Nf(t, e, o, r);
    for (let a = 0; a < i.length; a += 2) {
      let u = i[a];
      if (u > 0) n.push(s[a / 2]);
      else {
        let c = i[a + 1],
          l = e[-u];
        for (let d = de; d < l.length; d++) {
          let f = l[d];
          f[sr] === f[ne] && fa(f[b], f, c, n);
        }
        if (l[Cn] !== null) {
          let d = l[Cn];
          for (let f = 0; f < d.length; f++) {
            let h = d[f];
            fa(h[b], h, c, n);
          }
        }
      }
    }
  }
  return n;
}
function sD(t, e) {
  return t[Ye].queries[e].queryList;
}
function Of(t, e, r) {
  let n = new Ws((r & 4) === 4);
  return (
    Wv(t, e, n, n.destroy), (e[Ye] ??= new ca()).queries.push(new ua(n)) - 1
  );
}
function aD(t, e, r) {
  let n = he();
  return (
    n.firstCreatePass &&
      (Rf(n, new jo(t, e, r), -1), (e & 2) === 2 && (n.staticViewQueries = !0)),
    Of(n, H(), e)
  );
}
function uD(t, e, r, n) {
  let o = he();
  if (o.firstCreatePass) {
    let i = pe();
    Rf(o, new jo(e, r, n), i.index),
      lD(o, t),
      (r & 2) === 2 && (o.staticContentQueries = !0);
  }
  return Of(o, H(), r);
}
function cD(t) {
  return t.split(",").map((e) => e.trim());
}
function Rf(t, e, r) {
  t.queries === null && (t.queries = new la()), t.queries.track(new da(e, r));
}
function lD(t, e) {
  let r = t.contentQueries || (t.contentQueries = []),
    n = r.length ? r[r.length - 1] : -1;
  e !== n && r.push(t.queries.length - 1, e);
}
function ou(t, e) {
  return t.queries.getByIndex(e);
}
function dD(t, e) {
  let r = t[b],
    n = ou(r, e);
  return n.crossesNgTemplate ? fa(r, t, e, []) : Nf(r, t, n, e);
}
function iu(t, e) {
  dr("NgSignals");
  let r = Tc(t),
    n = r[rt];
  return (
    e?.equal && (n.equal = e.equal),
    (r.set = (o) => ts(n, o)),
    (r.update = (o) => Ac(n, o)),
    (r.asReadonly = fD.bind(r)),
    r
  );
}
function fD() {
  let t = this[rt];
  if (t.readonlyFn === void 0) {
    let e = () => this();
    (e[rt] = t), (t.readonlyFn = e);
  }
  return t.readonlyFn;
}
function hD(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function ht(t) {
  let e = hD(t.type),
    r = !0,
    n = [t];
  for (; e; ) {
    let o;
    if (ct(t)) o = e.ɵcmp || e.ɵdir;
    else {
      if (e.ɵcmp) throw new y(903, !1);
      o = e.ɵdir;
    }
    if (o) {
      if (r) {
        n.push(o);
        let s = t;
        (s.inputs = go(t.inputs)),
          (s.inputTransforms = go(t.inputTransforms)),
          (s.declaredInputs = go(t.declaredInputs)),
          (s.outputs = go(t.outputs));
        let a = o.hostBindings;
        a && yD(t, a);
        let u = o.viewQuery,
          c = o.contentQueries;
        if (
          (u && mD(t, u),
          c && vD(t, c),
          pD(t, o),
          dg(t.outputs, o.outputs),
          ct(o) && o.data.animation)
        ) {
          let l = t.data;
          l.animation = (l.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          a && a.ngInherit && a(t), a === ht && (r = !1);
        }
    }
    e = Object.getPrototypeOf(e);
  }
  gD(n);
}
function pD(t, e) {
  for (let r in e.inputs) {
    if (!e.inputs.hasOwnProperty(r) || t.inputs.hasOwnProperty(r)) continue;
    let n = e.inputs[r];
    if (
      n !== void 0 &&
      ((t.inputs[r] = n),
      (t.declaredInputs[r] = e.declaredInputs[r]),
      e.inputTransforms !== null)
    ) {
      let o = Array.isArray(n) ? n[0] : n;
      if (!e.inputTransforms.hasOwnProperty(o)) continue;
      (t.inputTransforms ??= {}), (t.inputTransforms[o] = e.inputTransforms[o]);
    }
  }
}
function gD(t) {
  let e = 0,
    r = null;
  for (let n = t.length - 1; n >= 0; n--) {
    let o = t[n];
    (o.hostVars = e += o.hostVars),
      (o.hostAttrs = Wn(o.hostAttrs, (r = Wn(r, o.hostAttrs))));
  }
}
function go(t) {
  return t === mn ? {} : t === we ? [] : t;
}
function mD(t, e) {
  let r = t.viewQuery;
  r
    ? (t.viewQuery = (n, o) => {
        e(n, o), r(n, o);
      })
    : (t.viewQuery = e);
}
function vD(t, e) {
  let r = t.contentQueries;
  r
    ? (t.contentQueries = (n, o, i) => {
        e(n, o, i), r(n, o, i);
      })
    : (t.contentQueries = e);
}
function yD(t, e) {
  let r = t.hostBindings;
  r
    ? (t.hostBindings = (n, o) => {
        e(n, o), r(n, o);
      })
    : (t.hostBindings = e);
}
function su(t) {
  let e = t.inputConfig,
    r = {};
  for (let n in e)
    if (e.hasOwnProperty(n)) {
      let o = e[n];
      Array.isArray(o) && o[3] && (r[n] = o[3]);
    }
  t.inputTransforms = r;
}
var lt = class {},
  nr = class {};
var ha = class extends lt {
    constructor(e, r, n) {
      super(),
        (this._parent = r),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new Vo(this));
      let o = Xl(e);
      (this._bootstrapComponents = Yd(o.bootstrap)),
        (this._r3Injector = kd(
          e,
          r,
          [
            { provide: lt, useValue: this },
            { provide: ni, useValue: this.componentFactoryResolver },
            ...n,
          ],
          le(e),
          new Set(["environment"]),
        )),
        this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(e));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let e = this._r3Injector;
      !e.destroyed && e.destroy(),
        this.destroyCbs.forEach((r) => r()),
        (this.destroyCbs = null);
    }
    onDestroy(e) {
      this.destroyCbs.push(e);
    }
  },
  pa = class extends nr {
    constructor(e) {
      super(), (this.moduleType = e);
    }
    create(e) {
      return new ha(this.moduleType, e, []);
    }
  };
var $o = class extends lt {
  constructor(e) {
    super(),
      (this.componentFactoryResolver = new Vo(this)),
      (this.instance = null);
    let r = new Zn(
      [
        ...e.providers,
        { provide: lt, useValue: this },
        { provide: ni, useValue: this.componentFactoryResolver },
      ],
      e.parent || Sa(),
      e.debugName,
      new Set(["environment"]),
    );
    (this.injector = r),
      e.runEnvironmentInitializers && r.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(e) {
    this.injector.onDestroy(e);
  }
};
function au(t, e, r = null) {
  return new $o({
    providers: t,
    parent: e,
    debugName: r,
    runEnvironmentInitializers: !0,
  }).injector;
}
var ri = (() => {
  let e = class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new ee(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function oi(t, e, r) {
  let n = t[e];
  return Object.is(n, r) ? !1 : ((t[e] = r), !0);
}
function DD(t) {
  return (t.flags & 32) === 32;
}
function CD(t, e, r, n, o, i, s, a, u) {
  let c = e.consts,
    l = ei(e, t, 4, s || null, To(c, a));
  ff(e, r, l, To(c, u)), ja(e, l);
  let d = (l.tView = Ja(
    2,
    l,
    n,
    o,
    i,
    e.directiveRegistry,
    e.pipeRegistry,
    null,
    e.schemas,
    c,
    null,
  ));
  return (
    e.queries !== null &&
      (e.queries.template(e, l), (d.queries = e.queries.embeddedTView(l))),
    l
  );
}
function Sn(t, e, r, n, o, i, s, a) {
  let u = H(),
    c = he(),
    l = t + Ue,
    d = c.firstCreatePass ? CD(l, c, u, e, r, n, o, i, s) : c.data[l];
  ar(d, !1);
  let f = wD(c, u, d, t);
  La() && Qa(c, u, f, d), Rt(f, u);
  let h = gf(f, u, f, d);
  return (
    (u[l] = h),
    ti(u, h),
    eD(h, d, u),
    Ta(d) && cf(c, u, d),
    s != null && lf(u, d, a),
    Sn
  );
}
var wD = ED;
function ED(t, e, r, n) {
  return Va(!0), e[se].createComment("");
}
function ii(t, e, r, n) {
  let o = H(),
    i = Ra();
  if (oi(o, i, e)) {
    let s = he(),
      a = bd();
    cy(a, o, t, e, r, n);
  }
  return ii;
}
function mo(t, e) {
  return (t << 17) | (e << 2);
}
function Pt(t) {
  return (t >> 17) & 32767;
}
function ID(t) {
  return (t & 2) == 2;
}
function bD(t, e) {
  return (t & 131071) | (e << 17);
}
function ga(t) {
  return t | 2;
}
function wn(t) {
  return (t & 131068) >> 2;
}
function xs(t, e) {
  return (t & -131069) | (e << 2);
}
function MD(t) {
  return (t & 1) === 1;
}
function ma(t) {
  return t | 1;
}
function _D(t, e, r, n, o, i) {
  let s = i ? e.classBindings : e.styleBindings,
    a = Pt(s),
    u = wn(s);
  t[n] = r;
  let c = !1,
    l;
  if (Array.isArray(r)) {
    let d = r;
    (l = d[1]), (l === null || or(d, l) > 0) && (c = !0);
  } else l = r;
  if (o)
    if (u !== 0) {
      let f = Pt(t[a + 1]);
      (t[n + 1] = mo(f, a)),
        f !== 0 && (t[f + 1] = xs(t[f + 1], n)),
        (t[a + 1] = bD(t[a + 1], n));
    } else
      (t[n + 1] = mo(a, 0)), a !== 0 && (t[a + 1] = xs(t[a + 1], n)), (a = n);
  else
    (t[n + 1] = mo(u, 0)),
      a === 0 ? (a = n) : (t[u + 1] = xs(t[u + 1], n)),
      (u = n);
  c && (t[n + 1] = ga(t[n + 1])),
    Nl(t, l, n, !0),
    Nl(t, l, n, !1),
    SD(e, l, t, n, i),
    (s = mo(a, u)),
    i ? (e.classBindings = s) : (e.styleBindings = s);
}
function SD(t, e, r, n, o) {
  let i = o ? t.residualClasses : t.residualStyles;
  i != null &&
    typeof e == "string" &&
    or(i, e) >= 0 &&
    (r[n + 1] = ma(r[n + 1]));
}
function Nl(t, e, r, n) {
  let o = t[r + 1],
    i = e === null,
    s = n ? Pt(o) : wn(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let u = t[s],
      c = t[s + 1];
    xD(u, e) && ((a = !0), (t[s + 1] = n ? ma(c) : ga(c))),
      (s = n ? Pt(c) : wn(c));
  }
  a && (t[r + 1] = n ? ga(o) : ma(o));
}
function xD(t, e) {
  return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
    ? !0
    : Array.isArray(t) && typeof e == "string"
      ? or(t, e) >= 0
      : !1;
}
function si(t, e, r) {
  let n = H(),
    o = Ra();
  if (oi(n, o, e)) {
    let i = he(),
      s = bd();
    Kv(i, s, n, t, e, n[se], r, !1);
  }
  return si;
}
function Ol(t, e, r, n, o) {
  let i = e.inputs,
    s = o ? "class" : "style";
  Xa(t, r, i[s], s, n);
}
function ai(t, e) {
  return TD(t, e, null, !0), ai;
}
function TD(t, e, r, n) {
  let o = H(),
    i = he(),
    s = Om(2);
  if ((i.firstUpdatePass && ND(i, t, s, n), e !== Jo && oi(o, s, e))) {
    let a = i.data[ur()];
    kD(i, a, o, o[se], t, (o[s + 1] = LD(e, r)), n, s);
  }
}
function AD(t, e) {
  return e >= t.expandoStartIndex;
}
function ND(t, e, r, n) {
  let o = t.data;
  if (o[r + 1] === null) {
    let i = o[ur()],
      s = AD(t, r);
    VD(i, n) && e === null && !s && (e = !1),
      (e = OD(o, i, e, n)),
      _D(o, i, e, r, s, n);
  }
}
function OD(t, e, r, n) {
  let o = km(t),
    i = n ? e.residualClasses : e.residualStyles;
  if (o === null)
    (n ? e.classBindings : e.styleBindings) === 0 &&
      ((r = Ts(null, t, e, r, n)), (r = rr(r, e.attrs, n)), (i = null));
  else {
    let s = e.directiveStylingLast;
    if (s === -1 || t[s] !== o)
      if (((r = Ts(o, t, e, r, n)), i === null)) {
        let u = RD(t, e, n);
        u !== void 0 &&
          Array.isArray(u) &&
          ((u = Ts(null, t, e, u[1], n)),
          (u = rr(u, e.attrs, n)),
          FD(t, e, n, u));
      } else i = PD(t, e, n);
  }
  return (
    i !== void 0 && (n ? (e.residualClasses = i) : (e.residualStyles = i)), r
  );
}
function RD(t, e, r) {
  let n = r ? e.classBindings : e.styleBindings;
  if (wn(n) !== 0) return t[Pt(n)];
}
function FD(t, e, r, n) {
  let o = r ? e.classBindings : e.styleBindings;
  t[Pt(o)] = n;
}
function PD(t, e, r) {
  let n,
    o = e.directiveEnd;
  for (let i = 1 + e.directiveStylingLast; i < o; i++) {
    let s = t[i].hostAttrs;
    n = rr(n, s, r);
  }
  return rr(n, e.attrs, r);
}
function Ts(t, e, r, n, o) {
  let i = null,
    s = r.directiveEnd,
    a = r.directiveStylingLast;
  for (
    a === -1 ? (a = r.directiveStart) : a++;
    a < s && ((i = e[a]), (n = rr(n, i.hostAttrs, o)), i !== t);

  )
    a++;
  return t !== null && (r.directiveStylingLast = a), n;
}
function rr(t, e, r) {
  let n = r ? 1 : 2,
    o = -1;
  if (e !== null)
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      typeof s == "number"
        ? (o = s)
        : o === n &&
          (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]),
          Fg(t, s, r ? !0 : e[++i]));
    }
  return t === void 0 ? null : t;
}
function kD(t, e, r, n, o, i, s, a) {
  if (!(e.type & 3)) return;
  let u = t.data,
    c = u[a + 1],
    l = MD(c) ? Rl(u, e, r, o, wn(c), s) : void 0;
  if (!Uo(l)) {
    Uo(i) || (ID(c) && (i = Rl(u, null, r, o, a, s)));
    let d = ym(ur(), r);
    jv(n, s, d, o, i);
  }
}
function Rl(t, e, r, n, o, i) {
  let s = e === null,
    a;
  for (; o > 0; ) {
    let u = t[o],
      c = Array.isArray(u),
      l = c ? u[1] : u,
      d = l === null,
      f = r[o + 1];
    f === Jo && (f = d ? we : void 0);
    let h = d ? ys(f, n) : l === n ? f : void 0;
    if ((c && !Uo(h) && (h = ys(u, n)), Uo(h) && ((a = h), s))) return a;
    let m = t[o + 1];
    o = s ? Pt(m) : wn(m);
  }
  if (e !== null) {
    let u = i ? e.residualClasses : e.residualStyles;
    u != null && (a = ys(u, n));
  }
  return a;
}
function Uo(t) {
  return t !== void 0;
}
function LD(t, e) {
  return (
    t == null ||
      t === "" ||
      (typeof e == "string"
        ? (t = t + e)
        : typeof t == "object" && (t = le(lr(t)))),
    t
  );
}
function VD(t, e) {
  return (t.flags & (e ? 8 : 16)) !== 0;
}
function fr(t, e, r) {
  dr("NgControlFlow");
  let n = H(),
    o = Ra(),
    i = jD(n, Ue + t),
    s = 0;
  if (oi(n, o, e)) {
    let a = P(null);
    try {
      if ((vy(i, s), e !== -1)) {
        let u = $D(n[b], Ue + e),
          c = ea(i, u.tView.ssrId),
          l = Cf(n, u, r, { dehydratedView: c });
        wf(i, l, s, Js(u, c));
      }
    } finally {
      P(a);
    }
  } else {
    let a = my(i, s);
    a !== void 0 && (a[je] = r);
  }
}
function jD(t, e) {
  return t[e];
}
function $D(t, e) {
  return Aa(t, e);
}
function UD(t, e, r, n, o, i) {
  let s = e.consts,
    a = To(s, o),
    u = ei(e, t, 2, n, a);
  return (
    ff(e, r, u, To(s, i)),
    u.attrs !== null && ia(u, u.attrs, !1),
    u.mergedAttrs !== null && ia(u, u.mergedAttrs, !0),
    e.queries !== null && e.queries.elementStart(e, u),
    u
  );
}
function v(t, e, r, n) {
  let o = H(),
    i = he(),
    s = Ue + t,
    a = o[se],
    u = i.firstCreatePass ? UD(s, i, o, e, r, n) : i.data[s],
    c = BD(i, o, u, a, e, t);
  o[s] = c;
  let l = Ta(u);
  return (
    ar(u, !0),
    nf(a, c, u),
    !DD(u) && La() && Qa(i, o, c, u),
    Im() === 0 && Rt(c, o),
    bm(),
    l && (cf(i, o, u), uf(i, u, o)),
    n !== null && lf(o, u),
    v
  );
}
function D() {
  let t = pe();
  vd() ? Am() : ((t = t.parent), ar(t, !1));
  let e = t;
  Sm(e) && xm(), Mm();
  let r = he();
  return (
    r.firstCreatePass && (ja(r, t), ud(t) && r.queries.elementEnd(t)),
    e.classesWithoutHost != null &&
      Bm(e) &&
      Ol(r, e, H(), e.classesWithoutHost, !0),
    e.stylesWithoutHost != null &&
      Hm(e) &&
      Ol(r, e, H(), e.stylesWithoutHost, !1),
    D
  );
}
function B(t, e, r, n) {
  return v(t, e, r, n), D(), B;
}
var BD = (t, e, r, n, o, i) => (Va(!0), Qd(n, o, Vm()));
var Bo = "en-US";
var HD = Bo;
function zD(t) {
  typeof t == "string" && (HD = t.toLowerCase().replace(/_/g, "-"));
}
function pt(t, e, r, n) {
  let o = H(),
    i = he(),
    s = pe();
  return qD(i, o, o[se], s, t, e, n), pt;
}
function GD(t, e, r, n) {
  let o = t.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === r && o[i + 1] === n) {
        let a = e[Yn],
          u = o[i + 2];
        return a.length > u ? a[u] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function qD(t, e, r, n, o, i, s) {
  let a = Ta(n),
    c = t.firstCreatePass && yf(t),
    l = e[je],
    d = vf(e),
    f = !0;
  if (n.type & 3 || s) {
    let T = Ie(n, e),
      z = s ? s(T) : T,
      L = d.length,
      Ge = s ? (qe) => s(Be(qe[n.index])) : n.index,
      ue = null;
    if ((!s && a && (ue = GD(t, e, o, n.index)), ue !== null)) {
      let qe = ue.__ngLastListenerFn__ || ue;
      (qe.__ngNextListenerFn__ = i), (ue.__ngLastListenerFn__ = i), (f = !1);
    } else {
      i = Pl(n, e, l, i, !1);
      let qe = r.listen(z, o, i);
      d.push(i, qe), c && c.push(o, Ge, L, L + 1);
    }
  } else i = Pl(n, e, l, i, !1);
  let h = n.outputs,
    m;
  if (f && h !== null && (m = h[o])) {
    let T = m.length;
    if (T)
      for (let z = 0; z < T; z += 2) {
        let L = m[z],
          Ge = m[z + 1],
          Zt = e[L][Ge].subscribe(i),
          Se = d.length;
        d.push(i, Zt), c && c.push(o, n.index, Se, -(Se + 1));
      }
  }
}
function Fl(t, e, r, n) {
  let o = P(null);
  try {
    return ke(6, e, r), r(n) !== !1;
  } catch (i) {
    return Df(t, i), !1;
  } finally {
    ke(7, e, r), P(o);
  }
}
function Pl(t, e, r, n, o) {
  return function i(s) {
    if (s === Function) return n;
    let a = t.componentOffset > -1 ? dt(t.index, e) : e;
    tu(a);
    let u = Fl(e, r, n, s),
      c = i.__ngNextListenerFn__;
    for (; c; ) (u = Fl(e, r, c, s) && u), (c = c.__ngNextListenerFn__);
    return o && u === !1 && s.preventDefault(), u;
  };
}
function Ff(t, e, r, n) {
  uD(t, e, r, n);
}
function Pf(t, e, r) {
  aD(t, e, r);
}
function ui(t) {
  let e = H(),
    r = he(),
    n = yd();
  Fa(n + 1);
  let o = ou(r, n);
  if (t.dirty && Dm(e) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) t.reset([]);
    else {
      let i = dD(e, n);
      t.reset(i, nv), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function ci() {
  return sD(H(), yd());
}
function F(t, e = "") {
  let r = H(),
    n = he(),
    o = t + Ue,
    i = n.firstCreatePass ? ei(n, o, 1, e, null) : n.data[o],
    s = WD(n, r, i, e, t);
  (r[o] = s), La() && Qa(n, r, s, i), ar(i, !1);
}
var WD = (t, e, r, n, o) => (Va(!0), wv(e[se], n));
function ZD(t, e, r) {
  let n = he();
  if (n.firstCreatePass) {
    let o = ct(t);
    va(r, n.data, n.blueprint, o, !0), va(e, n.data, n.blueprint, o, !1);
  }
}
function va(t, e, r, n, o) {
  if (((t = ae(t)), Array.isArray(t)))
    for (let i = 0; i < t.length; i++) va(t[i], e, r, n, o);
  else {
    let i = he(),
      s = H(),
      a = pe(),
      u = yn(t) ? t : ae(t.provide),
      c = id(t),
      l = a.providerIndexes & 1048575,
      d = a.directiveStart,
      f = a.providerIndexes >> 20;
    if (yn(t) || !t.multi) {
      let h = new Nt(c, o, x),
        m = Ns(u, e, o ? l : l + f, d);
      m === -1
        ? (Hs(Oo(a, s), i, u),
          As(i, t, e.length),
          e.push(u),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          r.push(h),
          s.push(h))
        : ((r[m] = h), (s[m] = h));
    } else {
      let h = Ns(u, e, l + f, d),
        m = Ns(u, e, l, l + f),
        T = h >= 0 && r[h],
        z = m >= 0 && r[m];
      if ((o && !z) || (!o && !T)) {
        Hs(Oo(a, s), i, u);
        let L = KD(o ? QD : YD, r.length, o, n, c);
        !o && z && (r[m].providerFactory = L),
          As(i, t, e.length, 0),
          e.push(u),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          r.push(L),
          s.push(L);
      } else {
        let L = kf(r[o ? m : h], c, !o && n);
        As(i, t, h > -1 ? h : m, L);
      }
      !o && n && z && r[m].componentProviders++;
    }
  }
}
function As(t, e, r, n) {
  let o = yn(e),
    i = tm(e);
  if (o || i) {
    let u = (i ? ae(e.useClass) : e).prototype.ngOnDestroy;
    if (u) {
      let c = t.destroyHooks || (t.destroyHooks = []);
      if (!o && e.multi) {
        let l = c.indexOf(r);
        l === -1 ? c.push(r, [n, u]) : c[l + 1].push(n, u);
      } else c.push(r, u);
    }
  }
}
function kf(t, e, r) {
  return r && t.componentProviders++, t.multi.push(e) - 1;
}
function Ns(t, e, r, n) {
  for (let o = r; o < n; o++) if (e[o] === t) return o;
  return -1;
}
function YD(t, e, r, n) {
  return ya(this.multi, []);
}
function QD(t, e, r, n) {
  let o = this.multi,
    i;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = Ot(r, r[b], this.providerFactory.index, n);
    (i = a.slice(0, s)), ya(o, i);
    for (let u = s; u < a.length; u++) i.push(a[u]);
  } else (i = []), ya(o, i);
  return i;
}
function ya(t, e) {
  for (let r = 0; r < t.length; r++) {
    let n = t[r];
    e.push(n());
  }
  return e;
}
function KD(t, e, r, n, o) {
  let i = new Nt(t, r, x);
  return (
    (i.multi = []),
    (i.index = e),
    (i.componentProviders = 0),
    kf(i, o, n && !r),
    i
  );
}
function li(t, e = []) {
  return (r) => {
    r.providersResolver = (n, o) => ZD(n, o ? o(t) : t, e);
  };
}
var JD = (() => {
  let e = class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let o = nd(!1, n.type),
          i =
            o.length > 0
              ? au([o], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, i);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  e.ɵprov = I({
    token: e,
    providedIn: "environment",
    factory: () => new e(R(Ee)),
  });
  let t = e;
  return t;
})();
function Y(t) {
  dr("NgStandalone"),
    (t.getStandaloneInjector = (e) =>
      e.get(JD).getOrCreateStandaloneInjector(t));
}
var di = (() => {
  let e = class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "platform" }));
  let t = e;
  return t;
})();
var Lf = new M("");
function $t(t) {
  return !!t && typeof t.then == "function";
}
function Vf(t) {
  return !!t && typeof t.subscribe == "function";
}
var jf = new M(""),
  $f = (() => {
    let e = class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, o) => {
            (this.resolve = n), (this.reject = o);
          })),
          (this.appInits = g(jf, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let i of this.appInits) {
          let s = i();
          if ($t(s)) n.push(s);
          else if (Vf(s)) {
            let a = new Promise((u, c) => {
              s.subscribe({ complete: u, error: c });
            });
            n.push(a);
          }
        }
        let o = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            o();
          })
          .catch((i) => {
            this.reject(i);
          }),
          n.length === 0 && o(),
          (this.initialized = !0);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  uu = new M("");
function XD() {
  xc(() => {
    throw new y(600, !1);
  });
}
function eC(t) {
  return t.isBoundToModule;
}
function tC(t, e, r) {
  try {
    let n = r();
    return $t(n)
      ? n.catch((o) => {
          throw (e.runOutsideAngular(() => t.handleError(o)), o);
        })
      : n;
  } catch (n) {
    throw (e.runOutsideAngular(() => t.handleError(n)), n);
  }
}
var hr = (() => {
  let e = class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = g(Ld)),
        (this.afterRenderEffectManager = g(xf)),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new oe()),
        (this.afterTick = new oe()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = g(ri).hasPendingTasks.pipe(N((n) => !n))),
        (this._injector = g(Ee));
    }
    get destroyed() {
      return this._destroyed;
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, o) {
      let i = n instanceof Lo;
      if (!this._injector.get($f).done) {
        let h = !i && Jl(n),
          m = !1;
        throw new y(405, m);
      }
      let a;
      i ? (a = n) : (a = this._injector.get(ni).resolveComponentFactory(n)),
        this.componentTypes.push(a.componentType);
      let u = eC(a) ? void 0 : this._injector.get(lt),
        c = o || a.selector,
        l = a.create(In.NULL, [], c, u),
        d = l.location.nativeElement,
        f = l.injector.get(Lf, null);
      return (
        f?.registerApplication(d),
        l.onDestroy(() => {
          this.detachView(l.hostView),
            Os(this.components, l),
            f?.unregisterApplication(d);
        }),
        this._loadComponent(l),
        l
      );
    }
    tick() {
      this._tick(!0);
    }
    _tick(n) {
      if (this._runningTick) throw new y(101, !1);
      let o = P(null);
      try {
        (this._runningTick = !0), this.detectChangesInAttachedViews(n);
      } catch (i) {
        this.internalErrorHandler(i);
      } finally {
        this.afterTick.next(), (this._runningTick = !1), P(o);
      }
    }
    detectChangesInAttachedViews(n) {
      let o = 0,
        i = this.afterRenderEffectManager;
      for (;;) {
        if (o === If) throw new y(103, !1);
        if (n) {
          let s = o === 0;
          this.beforeRender.next(s);
          for (let { _lView: a, notifyErrorHandler: u } of this._views)
            nC(a, s, u);
        }
        if (
          (o++,
          i.executeInternalCallbacks(),
          ![...this.externalTestViews.keys(), ...this._views].some(
            ({ _lView: s }) => Da(s),
          ) &&
            (i.execute(),
            ![...this.externalTestViews.keys(), ...this._views].some(
              ({ _lView: s }) => Da(s),
            )))
        )
          break;
      }
    }
    attachView(n) {
      let o = n;
      this._views.push(o), o.attachToAppRef(this);
    }
    detachView(n) {
      let o = n;
      Os(this._views, o), o.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let o = this._injector.get(uu, []);
      [...this._bootstrapListeners, ...o].forEach((i) => i(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Os(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new y(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function Os(t, e) {
  let r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}
function nC(t, e, r) {
  (!e && !Da(t)) || rC(t, r, e);
}
function Da(t) {
  return Oa(t);
}
function rC(t, e, r) {
  let n;
  r ? ((n = 0), (t[C] |= 1024)) : t[C] & 64 ? (n = 0) : (n = 1), bf(t, e, n);
}
var Ca = class {
    constructor(e, r) {
      (this.ngModuleFactory = e), (this.componentFactories = r);
    }
  },
  cu = (() => {
    let e = class e {
      compileModuleSync(n) {
        return new pa(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let o = this.compileModuleSync(n),
          i = Xl(n),
          s = Yd(i.declarations).reduce((a, u) => {
            let c = St(u);
            return c && a.push(new tr(c)), a;
          }, []);
        return new Ca(o, s);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var oC = (() => {
  let e = class e {
    constructor() {
      (this.zone = g(W)), (this.applicationRef = g(hr));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.zone.run(() => {
                this.applicationRef.tick();
              });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function iC(t) {
  return [
    { provide: W, useFactory: t },
    {
      provide: vn,
      multi: !0,
      useFactory: () => {
        let e = g(oC, { optional: !0 });
        return () => e.initialize();
      },
    },
    {
      provide: vn,
      multi: !0,
      useFactory: () => {
        let e = g(cC);
        return () => {
          e.initialize();
        };
      },
    },
    { provide: Ld, useFactory: sC },
  ];
}
function sC() {
  let t = g(W),
    e = g(Qe);
  return (r) => t.runOutsideAngular(() => e.handleError(r));
}
function aC(t) {
  let e = iC(() => new W(uC(t)));
  return qo([[], e]);
}
function uC(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
  };
}
var cC = (() => {
  let e = class e {
    constructor() {
      (this.subscription = new Q()),
        (this.initialized = !1),
        (this.zone = g(W)),
        (this.pendingTasks = g(ri));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              W.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            }),
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            W.assertInAngularZone(), (n ??= this.pendingTasks.add());
          }),
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function lC() {
  return (typeof $localize < "u" && $localize.locale) || Bo;
}
var lu = new M("", {
  providedIn: "root",
  factory: () => g(lu, S.Optional | S.SkipSelf) || lC(),
});
var Uf = new M("");
var Eo = null;
function dC(t = [], e) {
  return In.create({
    name: e,
    providers: [
      { provide: Wo, useValue: "platform" },
      { provide: Uf, useValue: new Set([() => (Eo = null)]) },
      ...t,
    ],
  });
}
function fC(t = []) {
  if (Eo) return Eo;
  let e = dC(t);
  return (Eo = e), XD(), hC(e), e;
}
function hC(t) {
  t.get(Ha, null)?.forEach((r) => r());
}
var Ut = (() => {
  let e = class e {};
  e.__NG_ELEMENT_ID__ = pC;
  let t = e;
  return t;
})();
function pC(t) {
  return gC(pe(), H(), (t & 16) === 16);
}
function gC(t, e, r) {
  if (Yo(t) && !r) {
    let n = dt(t.index, e);
    return new Ft(n, n);
  } else if (t.type & 47) {
    let n = e[$e];
    return new Ft(n, e);
  }
  return null;
}
function Bf(t) {
  try {
    let { rootComponent: e, appProviders: r, platformProviders: n } = t,
      o = fC(n),
      i = [aC(), ...(r || [])],
      a = new $o({
        providers: i,
        parent: o,
        debugName: "",
        runEnvironmentInitializers: !1,
      }).injector,
      u = a.get(W);
    return u.run(() => {
      a.resolveInjectorInitializers();
      let c = a.get(Qe, null),
        l;
      u.runOutsideAngular(() => {
        l = u.onError.subscribe({
          next: (h) => {
            c.handleError(h);
          },
        });
      });
      let d = () => a.destroy(),
        f = o.get(Uf);
      return (
        f.add(d),
        a.onDestroy(() => {
          l.unsubscribe(), f.delete(d);
        }),
        tC(c, u, () => {
          let h = a.get($f);
          return (
            h.runInitializers(),
            h.donePromise.then(() => {
              let m = a.get(lu, Bo);
              zD(m || Bo);
              let T = a.get(hr);
              return e !== void 0 && T.bootstrap(e), T;
            })
          );
        })
      );
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
function xn(t) {
  return typeof t == "boolean" ? t : t != null && t !== "false";
}
function Hf(t, e) {
  dr("NgSignals");
  let r = Mc(t);
  return e?.equal && (r[rt].equal = e.equal), r;
}
var qf = null;
function tt() {
  return qf;
}
function Wf(t) {
  qf ??= t;
}
var fi = class {};
var Me = new M(""),
  Zf = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("");
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: () => g(mC), providedIn: "platform" }));
    let t = e;
    return t;
  })();
var mC = (() => {
  let e = class e extends Zf {
    constructor() {
      super(),
        (this._doc = g(Me)),
        (this._location = window.location),
        (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return tt().getBaseHref(this._doc);
    }
    onPopState(n) {
      let o = tt().getGlobalEventTarget(this._doc, "window");
      return (
        o.addEventListener("popstate", n, !1),
        () => o.removeEventListener("popstate", n)
      );
    }
    onHashChange(n) {
      let o = tt().getGlobalEventTarget(this._doc, "window");
      return (
        o.addEventListener("hashchange", n, !1),
        () => o.removeEventListener("hashchange", n)
      );
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(n) {
      this._location.pathname = n;
    }
    pushState(n, o, i) {
      this._history.pushState(n, o, i);
    }
    replaceState(n, o, i) {
      this._history.replaceState(n, o, i);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(n = 0) {
      this._history.go(n);
    }
    getState() {
      return this._history.state;
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: () => new e(), providedIn: "platform" }));
  let t = e;
  return t;
})();
function Yf(t, e) {
  if (t.length == 0) return e;
  if (e.length == 0) return t;
  let r = 0;
  return (
    t.endsWith("/") && r++,
    e.startsWith("/") && r++,
    r == 2 ? t + e.substring(1) : r == 1 ? t + e : t + "/" + e
  );
}
function zf(t) {
  let e = t.match(/#|\?|$/),
    r = (e && e.index) || t.length,
    n = r - (t[r - 1] === "/" ? 1 : 0);
  return t.slice(0, n) + t.slice(r);
}
function Bt(t) {
  return t && t[0] !== "?" ? "?" + t : t;
}
var Tn = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("");
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: () => g(Qf), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  vC = new M(""),
  Qf = (() => {
    let e = class e extends Tn {
      constructor(n, o) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            o ??
            this._platformLocation.getBaseHrefFromDOM() ??
            g(Me).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n),
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return Yf(this._baseHref, n);
      }
      path(n = !1) {
        let o =
            this._platformLocation.pathname + Bt(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && n ? `${o}${i}` : o;
      }
      pushState(n, o, i, s) {
        let a = this.prepareExternalUrl(i + Bt(s));
        this._platformLocation.pushState(n, o, a);
      }
      replaceState(n, o, i, s) {
        let a = this.prepareExternalUrl(i + Bt(s));
        this._platformLocation.replaceState(n, o, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(R(Zf), R(vC, 8));
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var pr = (() => {
  let e = class e {
    constructor(n) {
      (this._subject = new X()),
        (this._urlChangeListeners = []),
        (this._urlChangeSubscription = null),
        (this._locationStrategy = n);
      let o = this._locationStrategy.getBaseHref();
      (this._basePath = CC(zf(Gf(o)))),
        this._locationStrategy.onPopState((i) => {
          this._subject.emit({
            url: this.path(!0),
            pop: !0,
            state: i.state,
            type: i.type,
          });
        });
    }
    ngOnDestroy() {
      this._urlChangeSubscription?.unsubscribe(),
        (this._urlChangeListeners = []);
    }
    path(n = !1) {
      return this.normalize(this._locationStrategy.path(n));
    }
    getState() {
      return this._locationStrategy.getState();
    }
    isCurrentPathEqualTo(n, o = "") {
      return this.path() == this.normalize(n + Bt(o));
    }
    normalize(n) {
      return e.stripTrailingSlash(DC(this._basePath, Gf(n)));
    }
    prepareExternalUrl(n) {
      return (
        n && n[0] !== "/" && (n = "/" + n),
        this._locationStrategy.prepareExternalUrl(n)
      );
    }
    go(n, o = "", i = null) {
      this._locationStrategy.pushState(i, "", n, o),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Bt(o)), i);
    }
    replaceState(n, o = "", i = null) {
      this._locationStrategy.replaceState(i, "", n, o),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Bt(o)), i);
    }
    forward() {
      this._locationStrategy.forward();
    }
    back() {
      this._locationStrategy.back();
    }
    historyGo(n = 0) {
      this._locationStrategy.historyGo?.(n);
    }
    onUrlChange(n) {
      return (
        this._urlChangeListeners.push(n),
        (this._urlChangeSubscription ??= this.subscribe((o) => {
          this._notifyUrlChangeListeners(o.url, o.state);
        })),
        () => {
          let o = this._urlChangeListeners.indexOf(n);
          this._urlChangeListeners.splice(o, 1),
            this._urlChangeListeners.length === 0 &&
              (this._urlChangeSubscription?.unsubscribe(),
              (this._urlChangeSubscription = null));
        }
      );
    }
    _notifyUrlChangeListeners(n = "", o) {
      this._urlChangeListeners.forEach((i) => i(n, o));
    }
    subscribe(n, o, i) {
      return this._subject.subscribe({ next: n, error: o, complete: i });
    }
  };
  (e.normalizeQueryParams = Bt),
    (e.joinWithSlash = Yf),
    (e.stripTrailingSlash = zf),
    (e.ɵfac = function (o) {
      return new (o || e)(R(Tn));
    }),
    (e.ɵprov = I({ token: e, factory: () => yC(), providedIn: "root" }));
  let t = e;
  return t;
})();
function yC() {
  return new pr(R(Tn));
}
function DC(t, e) {
  if (!t || !e.startsWith(t)) return e;
  let r = e.substring(t.length);
  return r === "" || ["/", ";", "?", "#"].includes(r[0]) ? r : e;
}
function Gf(t) {
  return t.replace(/\/index.html$/, "");
}
function CC(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    let [, r] = t.split(/\/\/[^\/]+/);
    return r;
  }
  return t;
}
function Kf(t, e) {
  e = encodeURIComponent(e);
  for (let r of t.split(";")) {
    let n = r.indexOf("="),
      [o, i] = n == -1 ? [r, ""] : [r.slice(0, n), r.slice(n + 1)];
    if (o.trim() === e) return decodeURIComponent(i);
  }
  return null;
}
var Ht = (() => {
    let e = class e {};
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵmod = Lt({ type: e })),
      (e.ɵinj = kt({}));
    let t = e;
    return t;
  })(),
  Jf = "browser",
  wC = "server";
function fu(t) {
  return t === wC;
}
var hi = class {};
var gu = class extends fi {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  mu = class t extends gu {
    static makeCurrent() {
      Wf(new t());
    }
    onAndCancel(e, r, n) {
      return (
        e.addEventListener(r, n),
        () => {
          e.removeEventListener(r, n);
        }
      );
    }
    dispatchEvent(e, r) {
      e.dispatchEvent(r);
    }
    remove(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    createElement(e, r) {
      return (r = r || this.getDefaultDocument()), r.createElement(e);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(e) {
      return e instanceof DocumentFragment;
    }
    getGlobalEventTarget(e, r) {
      return r === "window"
        ? window
        : r === "document"
          ? e
          : r === "body"
            ? e.body
            : null;
    }
    getBaseHref(e) {
      let r = bC();
      return r == null ? null : MC(r);
    }
    resetBaseElement() {
      gr = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(e) {
      return Kf(document.cookie, e);
    }
  },
  gr = null;
function bC() {
  return (
    (gr = gr || document.querySelector("base")),
    gr ? gr.getAttribute("href") : null
  );
}
function MC(t) {
  return new URL(t, document.baseURI).pathname;
}
var _C = (() => {
    let e = class e {
      build() {
        return new XMLHttpRequest();
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  vu = new M(""),
  nh = (() => {
    let e = class e {
      constructor(n, o) {
        (this._zone = o),
          (this._eventNameToPlugin = new Map()),
          n.forEach((i) => {
            i.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, o, i) {
        return this._findPluginFor(o).addEventListener(n, o, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let o = this._eventNameToPlugin.get(n);
        if (o) return o;
        if (((o = this._plugins.find((s) => s.supports(n))), !o))
          throw new y(5101, !1);
        return this._eventNameToPlugin.set(n, o), o;
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(R(vu), R(W));
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  pi = class {
    constructor(e) {
      this._doc = e;
    }
  },
  hu = "ng-app-id",
  rh = (() => {
    let e = class e {
      constructor(n, o, i, s = {}) {
        (this.doc = n),
          (this.appId = o),
          (this.nonce = i),
          (this.platformId = s),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = fu(s)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let o of n)
          this.changeUsageCount(o, 1) === 1 && this.onStyleAdded(o);
      }
      removeStyles(n) {
        for (let o of n)
          this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((o) => o.remove()), n.clear());
        for (let o of this.getAllStyles()) this.onStyleRemoved(o);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let o of this.getAllStyles()) this.addStyleToHost(n, o);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let o of this.hostNodes) this.addStyleToHost(o, n);
      }
      onStyleRemoved(n) {
        let o = this.styleRef;
        o.get(n)?.elements?.forEach((i) => i.remove()), o.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${hu}="${this.appId}"]`);
        if (n?.length) {
          let o = new Map();
          return (
            n.forEach((i) => {
              i.textContent != null && o.set(i.textContent, i);
            }),
            o
          );
        }
        return null;
      }
      changeUsageCount(n, o) {
        let i = this.styleRef;
        if (i.has(n)) {
          let s = i.get(n);
          return (s.usage += o), s.usage;
        }
        return i.set(n, { usage: o, elements: [] }), o;
      }
      getStyleElement(n, o) {
        let i = this.styleNodesInDOM,
          s = i?.get(o);
        if (s?.parentNode === n) return i.delete(o), s.removeAttribute(hu), s;
        {
          let a = this.doc.createElement("style");
          return (
            this.nonce && a.setAttribute("nonce", this.nonce),
            (a.textContent = o),
            this.platformIsServer && a.setAttribute(hu, this.appId),
            n.appendChild(a),
            a
          );
        }
      }
      addStyleToHost(n, o) {
        let i = this.getStyleElement(n, o),
          s = this.styleRef,
          a = s.get(o)?.elements;
        a ? a.push(i) : s.set(o, { elements: [i], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(R(Me), R(Ba), R(za, 8), R(Mn));
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  pu = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/MathML/",
  },
  Du = /%COMP%/g,
  oh = "%COMP%",
  SC = `_nghost-${oh}`,
  xC = `_ngcontent-${oh}`,
  TC = !0,
  AC = new M("", { providedIn: "root", factory: () => TC });
function NC(t) {
  return xC.replace(Du, t);
}
function OC(t) {
  return SC.replace(Du, t);
}
function ih(t, e) {
  return e.map((r) => r.replace(Du, t));
}
var Xf = (() => {
    let e = class e {
      constructor(n, o, i, s, a, u, c, l = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = o),
          (this.appId = i),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = a),
          (this.platformId = u),
          (this.ngZone = c),
          (this.nonce = l),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = fu(u)),
          (this.defaultRenderer = new mr(n, a, c, this.platformIsServer));
      }
      createRenderer(n, o) {
        if (!n || !o) return this.defaultRenderer;
        this.platformIsServer &&
          o.encapsulation === Ve.ShadowDom &&
          (o = $(p({}, o), { encapsulation: Ve.Emulated }));
        let i = this.getOrCreateRenderer(n, o);
        return (
          i instanceof gi
            ? i.applyToHost(n)
            : i instanceof vr && i.applyStyles(),
          i
        );
      }
      getOrCreateRenderer(n, o) {
        let i = this.rendererByCompId,
          s = i.get(o.id);
        if (!s) {
          let a = this.doc,
            u = this.ngZone,
            c = this.eventManager,
            l = this.sharedStylesHost,
            d = this.removeStylesOnCompDestroy,
            f = this.platformIsServer;
          switch (o.encapsulation) {
            case Ve.Emulated:
              s = new gi(c, l, o, this.appId, d, a, u, f);
              break;
            case Ve.ShadowDom:
              return new yu(c, l, n, o, a, u, this.nonce, f);
            default:
              s = new vr(c, l, o, d, a, u, f);
              break;
          }
          i.set(o.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(
        R(nh),
        R(rh),
        R(Ba),
        R(AC),
        R(Me),
        R(Mn),
        R(W),
        R(za),
      );
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  mr = class {
    constructor(e, r, n, o) {
      (this.eventManager = e),
        (this.doc = r),
        (this.ngZone = n),
        (this.platformIsServer = o),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(e, r) {
      return r
        ? this.doc.createElementNS(pu[r] || r, e)
        : this.doc.createElement(e);
    }
    createComment(e) {
      return this.doc.createComment(e);
    }
    createText(e) {
      return this.doc.createTextNode(e);
    }
    appendChild(e, r) {
      (eh(e) ? e.content : e).appendChild(r);
    }
    insertBefore(e, r, n) {
      e && (eh(e) ? e.content : e).insertBefore(r, n);
    }
    removeChild(e, r) {
      e && e.removeChild(r);
    }
    selectRootElement(e, r) {
      let n = typeof e == "string" ? this.doc.querySelector(e) : e;
      if (!n) throw new y(-5104, !1);
      return r || (n.textContent = ""), n;
    }
    parentNode(e) {
      return e.parentNode;
    }
    nextSibling(e) {
      return e.nextSibling;
    }
    setAttribute(e, r, n, o) {
      if (o) {
        r = o + ":" + r;
        let i = pu[o];
        i ? e.setAttributeNS(i, r, n) : e.setAttribute(r, n);
      } else e.setAttribute(r, n);
    }
    removeAttribute(e, r, n) {
      if (n) {
        let o = pu[n];
        o ? e.removeAttributeNS(o, r) : e.removeAttribute(`${n}:${r}`);
      } else e.removeAttribute(r);
    }
    addClass(e, r) {
      e.classList.add(r);
    }
    removeClass(e, r) {
      e.classList.remove(r);
    }
    setStyle(e, r, n, o) {
      o & (Ke.DashCase | Ke.Important)
        ? e.style.setProperty(r, n, o & Ke.Important ? "important" : "")
        : (e.style[r] = n);
    }
    removeStyle(e, r, n) {
      n & Ke.DashCase ? e.style.removeProperty(r) : (e.style[r] = "");
    }
    setProperty(e, r, n) {
      e != null && (e[r] = n);
    }
    setValue(e, r) {
      e.nodeValue = r;
    }
    listen(e, r, n) {
      if (
        typeof e == "string" &&
        ((e = tt().getGlobalEventTarget(this.doc, e)), !e)
      )
        throw new Error(`Unsupported event target ${e} for event ${r}`);
      return this.eventManager.addEventListener(
        e,
        r,
        this.decoratePreventDefault(n),
      );
    }
    decoratePreventDefault(e) {
      return (r) => {
        if (r === "__ngUnwrap__") return e;
        (this.platformIsServer ? this.ngZone.runGuarded(() => e(r)) : e(r)) ===
          !1 && r.preventDefault();
      };
    }
  };
function eh(t) {
  return t.tagName === "TEMPLATE" && t.content !== void 0;
}
var yu = class extends mr {
    constructor(e, r, n, o, i, s, a, u) {
      super(e, i, s, u),
        (this.sharedStylesHost = r),
        (this.hostEl = n),
        (this.shadowRoot = n.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = ih(o.id, o.styles);
      for (let l of c) {
        let d = document.createElement("style");
        a && d.setAttribute("nonce", a),
          (d.textContent = l),
          this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(e) {
      return e === this.hostEl ? this.shadowRoot : e;
    }
    appendChild(e, r) {
      return super.appendChild(this.nodeOrShadowRoot(e), r);
    }
    insertBefore(e, r, n) {
      return super.insertBefore(this.nodeOrShadowRoot(e), r, n);
    }
    removeChild(e, r) {
      return super.removeChild(this.nodeOrShadowRoot(e), r);
    }
    parentNode(e) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  vr = class extends mr {
    constructor(e, r, n, o, i, s, a, u) {
      super(e, i, s, a),
        (this.sharedStylesHost = r),
        (this.removeStylesOnCompDestroy = o),
        (this.styles = u ? ih(u, n.styles) : n.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  gi = class extends vr {
    constructor(e, r, n, o, i, s, a, u) {
      let c = o + "-" + n.id;
      super(e, r, n, i, s, a, u, c),
        (this.contentAttr = NC(c)),
        (this.hostAttr = OC(c));
    }
    applyToHost(e) {
      this.applyStyles(), this.setAttribute(e, this.hostAttr, "");
    }
    createElement(e, r) {
      let n = super.createElement(e, r);
      return super.setAttribute(n, this.contentAttr, ""), n;
    }
  },
  RC = (() => {
    let e = class e extends pi {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, o, i) {
        return (
          n.addEventListener(o, i, !1), () => this.removeEventListener(n, o, i)
        );
      }
      removeEventListener(n, o, i) {
        return n.removeEventListener(o, i);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(R(Me));
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  th = ["alt", "control", "meta", "shift"],
  FC = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  PC = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  kC = (() => {
    let e = class e extends pi {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, o, i) {
        let s = e.parseEventName(o),
          a = e.eventCallback(s.fullKey, i, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => tt().onAndCancel(n, s.domEventName, a));
      }
      static parseEventName(n) {
        let o = n.toLowerCase().split("."),
          i = o.shift();
        if (o.length === 0 || !(i === "keydown" || i === "keyup")) return null;
        let s = e._normalizeKey(o.pop()),
          a = "",
          u = o.indexOf("code");
        if (
          (u > -1 && (o.splice(u, 1), (a = "code.")),
          th.forEach((l) => {
            let d = o.indexOf(l);
            d > -1 && (o.splice(d, 1), (a += l + "."));
          }),
          (a += s),
          o.length != 0 || s.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = i), (c.fullKey = a), c;
      }
      static matchEventFullKeyCode(n, o) {
        let i = FC[n.key] || n.key,
          s = "";
        return (
          o.indexOf("code.") > -1 && ((i = n.code), (s = "code.")),
          i == null || !i
            ? !1
            : ((i = i.toLowerCase()),
              i === " " ? (i = "space") : i === "." && (i = "dot"),
              th.forEach((a) => {
                if (a !== i) {
                  let u = PC[a];
                  u(n) && (s += a + ".");
                }
              }),
              (s += i),
              s === o)
        );
      }
      static eventCallback(n, o, i) {
        return (s) => {
          e.matchEventFullKeyCode(s, n) && i.runGuarded(() => o(s));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(R(Me));
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function sh(t, e) {
  return Bf(p({ rootComponent: t }, LC(e)));
}
function LC(t) {
  return {
    appProviders: [...BC, ...(t?.providers ?? [])],
    platformProviders: UC,
  };
}
function VC() {
  mu.makeCurrent();
}
function jC() {
  return new Qe();
}
function $C() {
  return zd(document), document;
}
var UC = [
  { provide: Mn, useValue: Jf },
  { provide: Ha, useValue: VC, multi: !0 },
  { provide: Me, useFactory: $C, deps: [] },
];
var BC = [
  { provide: Wo, useValue: "root" },
  { provide: Qe, useFactory: jC, deps: [] },
  { provide: vu, useClass: RC, multi: !0, deps: [Me, W, Mn] },
  { provide: vu, useClass: kC, multi: !0, deps: [Me] },
  Xf,
  rh,
  nh,
  { provide: er, useExisting: Xf },
  { provide: hi, useClass: _C, deps: [] },
  [],
];
var gt = (() => {
  let e = class e {
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || "";
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)(R(Me));
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var _ = "primary",
  Or = Symbol("RouteTitle"),
  bu = class {
    constructor(e) {
      this.params = e || {};
    }
    has(e) {
      return Object.prototype.hasOwnProperty.call(this.params, e);
    }
    get(e) {
      if (this.has(e)) {
        let r = this.params[e];
        return Array.isArray(r) ? r[0] : r;
      }
      return null;
    }
    getAll(e) {
      if (this.has(e)) {
        let r = this.params[e];
        return Array.isArray(r) ? r : [r];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Fn(t) {
  return new bu(t);
}
function HC(t, e, r) {
  let n = r.path.split("/");
  if (
    n.length > t.length ||
    (r.pathMatch === "full" && (e.hasChildren() || n.length < t.length))
  )
    return null;
  let o = {};
  for (let i = 0; i < n.length; i++) {
    let s = n[i],
      a = t[i];
    if (s.startsWith(":")) o[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: t.slice(0, n.length), posParams: o };
}
function zC(t, e) {
  if (t.length !== e.length) return !1;
  for (let r = 0; r < t.length; ++r) if (!He(t[r], e[r])) return !1;
  return !0;
}
function He(t, e) {
  let r = t ? Mu(t) : void 0,
    n = e ? Mu(e) : void 0;
  if (!r || !n || r.length != n.length) return !1;
  let o;
  for (let i = 0; i < r.length; i++)
    if (((o = r[i]), !fh(t[o], e[o]))) return !1;
  return !0;
}
function Mu(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function fh(t, e) {
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    let r = [...t].sort(),
      n = [...e].sort();
    return r.every((o, i) => n[i] === o);
  } else return t === e;
}
function hh(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function yt(t) {
  return ds(t) ? t : $t(t) ? G(Promise.resolve(t)) : w(t);
}
var GC = { exact: gh, subset: mh },
  ph = { exact: qC, subset: WC, ignored: () => !0 };
function ah(t, e, r) {
  return (
    GC[r.paths](t.root, e.root, r.matrixParams) &&
    ph[r.queryParams](t.queryParams, e.queryParams) &&
    !(r.fragment === "exact" && t.fragment !== e.fragment)
  );
}
function qC(t, e) {
  return He(t, e);
}
function gh(t, e, r) {
  if (
    !Gt(t.segments, e.segments) ||
    !Di(t.segments, e.segments, r) ||
    t.numberOfChildren !== e.numberOfChildren
  )
    return !1;
  for (let n in e.children)
    if (!t.children[n] || !gh(t.children[n], e.children[n], r)) return !1;
  return !0;
}
function WC(t, e) {
  return (
    Object.keys(e).length <= Object.keys(t).length &&
    Object.keys(e).every((r) => fh(t[r], e[r]))
  );
}
function mh(t, e, r) {
  return vh(t, e, e.segments, r);
}
function vh(t, e, r, n) {
  if (t.segments.length > r.length) {
    let o = t.segments.slice(0, r.length);
    return !(!Gt(o, r) || e.hasChildren() || !Di(o, r, n));
  } else if (t.segments.length === r.length) {
    if (!Gt(t.segments, r) || !Di(t.segments, r, n)) return !1;
    for (let o in e.children)
      if (!t.children[o] || !mh(t.children[o], e.children[o], n)) return !1;
    return !0;
  } else {
    let o = r.slice(0, t.segments.length),
      i = r.slice(t.segments.length);
    return !Gt(t.segments, o) || !Di(t.segments, o, n) || !t.children[_]
      ? !1
      : vh(t.children[_], e, i, n);
  }
}
function Di(t, e, r) {
  return e.every((n, o) => ph[r](t[o].parameters, n.parameters));
}
var mt = class {
    constructor(e = new j([], {}), r = {}, n = null) {
      (this.root = e), (this.queryParams = r), (this.fragment = n);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Fn(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return QC.serialize(this);
    }
  },
  j = class {
    constructor(e, r) {
      (this.segments = e),
        (this.children = r),
        (this.parent = null),
        Object.values(r).forEach((n) => (n.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Ci(this);
    }
  },
  zt = class {
    constructor(e, r) {
      (this.path = e), (this.parameters = r);
    }
    get parameterMap() {
      return (this._parameterMap ??= Fn(this.parameters)), this._parameterMap;
    }
    toString() {
      return Dh(this);
    }
  };
function ZC(t, e) {
  return Gt(t, e) && t.every((r, n) => He(r.parameters, e[n].parameters));
}
function Gt(t, e) {
  return t.length !== e.length ? !1 : t.every((r, n) => r.path === e[n].path);
}
function YC(t, e) {
  let r = [];
  return (
    Object.entries(t.children).forEach(([n, o]) => {
      n === _ && (r = r.concat(e(o, n)));
    }),
    Object.entries(t.children).forEach(([n, o]) => {
      n !== _ && (r = r.concat(e(o, n)));
    }),
    r
  );
}
var Ku = (() => {
    let e = class e {};
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: () => new Ei(), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Ei = class {
    parse(e) {
      let r = new Su(e);
      return new mt(
        r.parseRootSegment(),
        r.parseQueryParams(),
        r.parseFragment(),
      );
    }
    serialize(e) {
      let r = `/${yr(e.root, !0)}`,
        n = XC(e.queryParams),
        o = typeof e.fragment == "string" ? `#${KC(e.fragment)}` : "";
      return `${r}${n}${o}`;
    }
  },
  QC = new Ei();
function Ci(t) {
  return t.segments.map((e) => Dh(e)).join("/");
}
function yr(t, e) {
  if (!t.hasChildren()) return Ci(t);
  if (e) {
    let r = t.children[_] ? yr(t.children[_], !1) : "",
      n = [];
    return (
      Object.entries(t.children).forEach(([o, i]) => {
        o !== _ && n.push(`${o}:${yr(i, !1)}`);
      }),
      n.length > 0 ? `${r}(${n.join("//")})` : r
    );
  } else {
    let r = YC(t, (n, o) =>
      o === _ ? [yr(t.children[_], !1)] : [`${o}:${yr(n, !1)}`],
    );
    return Object.keys(t.children).length === 1 && t.children[_] != null
      ? `${Ci(t)}/${r[0]}`
      : `${Ci(t)}/(${r.join("//")})`;
  }
}
function yh(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function vi(t) {
  return yh(t).replace(/%3B/gi, ";");
}
function KC(t) {
  return encodeURI(t);
}
function _u(t) {
  return yh(t)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function wi(t) {
  return decodeURIComponent(t);
}
function uh(t) {
  return wi(t.replace(/\+/g, "%20"));
}
function Dh(t) {
  return `${_u(t.path)}${JC(t.parameters)}`;
}
function JC(t) {
  return Object.entries(t)
    .map(([e, r]) => `;${_u(e)}=${_u(r)}`)
    .join("");
}
function XC(t) {
  let e = Object.entries(t)
    .map(([r, n]) =>
      Array.isArray(n)
        ? n.map((o) => `${vi(r)}=${vi(o)}`).join("&")
        : `${vi(r)}=${vi(n)}`,
    )
    .filter((r) => r);
  return e.length ? `?${e.join("&")}` : "";
}
var ew = /^[^\/()?;#]+/;
function Cu(t) {
  let e = t.match(ew);
  return e ? e[0] : "";
}
var tw = /^[^\/()?;=#]+/;
function nw(t) {
  let e = t.match(tw);
  return e ? e[0] : "";
}
var rw = /^[^=?&#]+/;
function ow(t) {
  let e = t.match(rw);
  return e ? e[0] : "";
}
var iw = /^[^&#]+/;
function sw(t) {
  let e = t.match(iw);
  return e ? e[0] : "";
}
var Su = class {
  constructor(e) {
    (this.url = e), (this.remaining = e);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new j([], {})
        : new j([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let e = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(e);
      while (this.consumeOptional("&"));
    return e;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let e = [];
    for (
      this.peekStartsWith("(") || e.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), e.push(this.parseSegment());
    let r = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (r = this.parseParens(!0)));
    let n = {};
    return (
      this.peekStartsWith("(") && (n = this.parseParens(!1)),
      (e.length > 0 || Object.keys(r).length > 0) && (n[_] = new j(e, r)),
      n
    );
  }
  parseSegment() {
    let e = Cu(this.remaining);
    if (e === "" && this.peekStartsWith(";")) throw new y(4009, !1);
    return this.capture(e), new zt(wi(e), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let e = {};
    for (; this.consumeOptional(";"); ) this.parseParam(e);
    return e;
  }
  parseParam(e) {
    let r = nw(this.remaining);
    if (!r) return;
    this.capture(r);
    let n = "";
    if (this.consumeOptional("=")) {
      let o = Cu(this.remaining);
      o && ((n = o), this.capture(n));
    }
    e[wi(r)] = wi(n);
  }
  parseQueryParam(e) {
    let r = ow(this.remaining);
    if (!r) return;
    this.capture(r);
    let n = "";
    if (this.consumeOptional("=")) {
      let s = sw(this.remaining);
      s && ((n = s), this.capture(n));
    }
    let o = uh(r),
      i = uh(n);
    if (e.hasOwnProperty(o)) {
      let s = e[o];
      Array.isArray(s) || ((s = [s]), (e[o] = s)), s.push(i);
    } else e[o] = i;
  }
  parseParens(e) {
    let r = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let n = Cu(this.remaining),
        o = this.remaining[n.length];
      if (o !== "/" && o !== ")" && o !== ";") throw new y(4010, !1);
      let i;
      n.indexOf(":") > -1
        ? ((i = n.slice(0, n.indexOf(":"))), this.capture(i), this.capture(":"))
        : e && (i = _);
      let s = this.parseChildren();
      (r[i] = Object.keys(s).length === 1 ? s[_] : new j([], s)),
        this.consumeOptional("//");
    }
    return r;
  }
  peekStartsWith(e) {
    return this.remaining.startsWith(e);
  }
  consumeOptional(e) {
    return this.peekStartsWith(e)
      ? ((this.remaining = this.remaining.substring(e.length)), !0)
      : !1;
  }
  capture(e) {
    if (!this.consumeOptional(e)) throw new y(4011, !1);
  }
};
function Ch(t) {
  return t.segments.length > 0 ? new j([], { [_]: t }) : t;
}
function wh(t) {
  let e = {};
  for (let [n, o] of Object.entries(t.children)) {
    let i = wh(o);
    if (n === _ && i.segments.length === 0 && i.hasChildren())
      for (let [s, a] of Object.entries(i.children)) e[s] = a;
    else (i.segments.length > 0 || i.hasChildren()) && (e[n] = i);
  }
  let r = new j(t.segments, e);
  return aw(r);
}
function aw(t) {
  if (t.numberOfChildren === 1 && t.children[_]) {
    let e = t.children[_];
    return new j(t.segments.concat(e.segments), e.children);
  }
  return t;
}
function Pn(t) {
  return t instanceof mt;
}
function uw(t, e, r = null, n = null) {
  let o = Eh(t);
  return Ih(o, e, r, n);
}
function Eh(t) {
  let e;
  function r(i) {
    let s = {};
    for (let u of i.children) {
      let c = r(u);
      s[u.outlet] = c;
    }
    let a = new j(i.url, s);
    return i === t && (e = a), a;
  }
  let n = r(t.root),
    o = Ch(n);
  return e ?? o;
}
function Ih(t, e, r, n) {
  let o = t;
  for (; o.parent; ) o = o.parent;
  if (e.length === 0) return wu(o, o, o, r, n);
  let i = cw(e);
  if (i.toRoot()) return wu(o, o, new j([], {}), r, n);
  let s = lw(i, o, t),
    a = s.processChildren
      ? wr(s.segmentGroup, s.index, i.commands)
      : Mh(s.segmentGroup, s.index, i.commands);
  return wu(o, s.segmentGroup, a, r, n);
}
function Ii(t) {
  return typeof t == "object" && t != null && !t.outlets && !t.segmentPath;
}
function br(t) {
  return typeof t == "object" && t != null && t.outlets;
}
function wu(t, e, r, n, o) {
  let i = {};
  n &&
    Object.entries(n).forEach(([u, c]) => {
      i[u] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
    });
  let s;
  t === e ? (s = r) : (s = bh(t, e, r));
  let a = Ch(wh(s));
  return new mt(a, i, o);
}
function bh(t, e, r) {
  let n = {};
  return (
    Object.entries(t.children).forEach(([o, i]) => {
      i === e ? (n[o] = r) : (n[o] = bh(i, e, r));
    }),
    new j(t.segments, n)
  );
}
var bi = class {
  constructor(e, r, n) {
    if (
      ((this.isAbsolute = e),
      (this.numberOfDoubleDots = r),
      (this.commands = n),
      e && n.length > 0 && Ii(n[0]))
    )
      throw new y(4003, !1);
    let o = n.find(br);
    if (o && o !== hh(n)) throw new y(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function cw(t) {
  if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
    return new bi(!0, 0, t);
  let e = 0,
    r = !1,
    n = t.reduce((o, i, s) => {
      if (typeof i == "object" && i != null) {
        if (i.outlets) {
          let a = {};
          return (
            Object.entries(i.outlets).forEach(([u, c]) => {
              a[u] = typeof c == "string" ? c.split("/") : c;
            }),
            [...o, { outlets: a }]
          );
        }
        if (i.segmentPath) return [...o, i.segmentPath];
      }
      return typeof i != "string"
        ? [...o, i]
        : s === 0
          ? (i.split("/").forEach((a, u) => {
              (u == 0 && a === ".") ||
                (u == 0 && a === ""
                  ? (r = !0)
                  : a === ".."
                    ? e++
                    : a != "" && o.push(a));
            }),
            o)
          : [...o, i];
    }, []);
  return new bi(r, e, n);
}
var On = class {
  constructor(e, r, n) {
    (this.segmentGroup = e), (this.processChildren = r), (this.index = n);
  }
};
function lw(t, e, r) {
  if (t.isAbsolute) return new On(e, !0, 0);
  if (!r) return new On(e, !1, NaN);
  if (r.parent === null) return new On(r, !0, 0);
  let n = Ii(t.commands[0]) ? 0 : 1,
    o = r.segments.length - 1 + n;
  return dw(r, o, t.numberOfDoubleDots);
}
function dw(t, e, r) {
  let n = t,
    o = e,
    i = r;
  for (; i > o; ) {
    if (((i -= o), (n = n.parent), !n)) throw new y(4005, !1);
    o = n.segments.length;
  }
  return new On(n, !1, o - i);
}
function fw(t) {
  return br(t[0]) ? t[0].outlets : { [_]: t };
}
function Mh(t, e, r) {
  if (((t ??= new j([], {})), t.segments.length === 0 && t.hasChildren()))
    return wr(t, e, r);
  let n = hw(t, e, r),
    o = r.slice(n.commandIndex);
  if (n.match && n.pathIndex < t.segments.length) {
    let i = new j(t.segments.slice(0, n.pathIndex), {});
    return (
      (i.children[_] = new j(t.segments.slice(n.pathIndex), t.children)),
      wr(i, 0, o)
    );
  } else
    return n.match && o.length === 0
      ? new j(t.segments, {})
      : n.match && !t.hasChildren()
        ? xu(t, e, r)
        : n.match
          ? wr(t, 0, o)
          : xu(t, e, r);
}
function wr(t, e, r) {
  if (r.length === 0) return new j(t.segments, {});
  {
    let n = fw(r),
      o = {};
    if (
      Object.keys(n).some((i) => i !== _) &&
      t.children[_] &&
      t.numberOfChildren === 1 &&
      t.children[_].segments.length === 0
    ) {
      let i = wr(t.children[_], e, r);
      return new j(t.segments, i.children);
    }
    return (
      Object.entries(n).forEach(([i, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (o[i] = Mh(t.children[i], e, s));
      }),
      Object.entries(t.children).forEach(([i, s]) => {
        n[i] === void 0 && (o[i] = s);
      }),
      new j(t.segments, o)
    );
  }
}
function hw(t, e, r) {
  let n = 0,
    o = e,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; o < t.segments.length; ) {
    if (n >= r.length) return i;
    let s = t.segments[o],
      a = r[n];
    if (br(a)) break;
    let u = `${a}`,
      c = n < r.length - 1 ? r[n + 1] : null;
    if (o > 0 && u === void 0) break;
    if (u && c && typeof c == "object" && c.outlets === void 0) {
      if (!lh(u, c, s)) return i;
      n += 2;
    } else {
      if (!lh(u, {}, s)) return i;
      n++;
    }
    o++;
  }
  return { match: !0, pathIndex: o, commandIndex: n };
}
function xu(t, e, r) {
  let n = t.segments.slice(0, e),
    o = 0;
  for (; o < r.length; ) {
    let i = r[o];
    if (br(i)) {
      let u = pw(i.outlets);
      return new j(n, u);
    }
    if (o === 0 && Ii(r[0])) {
      let u = t.segments[e];
      n.push(new zt(u.path, ch(r[0]))), o++;
      continue;
    }
    let s = br(i) ? i.outlets[_] : `${i}`,
      a = o < r.length - 1 ? r[o + 1] : null;
    s && a && Ii(a)
      ? (n.push(new zt(s, ch(a))), (o += 2))
      : (n.push(new zt(s, {})), o++);
  }
  return new j(n, {});
}
function pw(t) {
  let e = {};
  return (
    Object.entries(t).forEach(([r, n]) => {
      typeof n == "string" && (n = [n]),
        n !== null && (e[r] = xu(new j([], {}), 0, n));
    }),
    e
  );
}
function ch(t) {
  let e = {};
  return Object.entries(t).forEach(([r, n]) => (e[r] = `${n}`)), e;
}
function lh(t, e, r) {
  return t == r.path && He(e, r.parameters);
}
var Er = "imperative",
  re = (function (t) {
    return (
      (t[(t.NavigationStart = 0)] = "NavigationStart"),
      (t[(t.NavigationEnd = 1)] = "NavigationEnd"),
      (t[(t.NavigationCancel = 2)] = "NavigationCancel"),
      (t[(t.NavigationError = 3)] = "NavigationError"),
      (t[(t.RoutesRecognized = 4)] = "RoutesRecognized"),
      (t[(t.ResolveStart = 5)] = "ResolveStart"),
      (t[(t.ResolveEnd = 6)] = "ResolveEnd"),
      (t[(t.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (t[(t.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (t[(t.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (t[(t.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (t[(t.ChildActivationStart = 11)] = "ChildActivationStart"),
      (t[(t.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (t[(t.ActivationStart = 13)] = "ActivationStart"),
      (t[(t.ActivationEnd = 14)] = "ActivationEnd"),
      (t[(t.Scroll = 15)] = "Scroll"),
      (t[(t.NavigationSkipped = 16)] = "NavigationSkipped"),
      t
    );
  })(re || {}),
  _e = class {
    constructor(e, r) {
      (this.id = e), (this.url = r);
    }
  },
  Mr = class extends _e {
    constructor(e, r, n = "imperative", o = null) {
      super(e, r),
        (this.type = re.NavigationStart),
        (this.navigationTrigger = n),
        (this.restoredState = o);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  nt = class extends _e {
    constructor(e, r, n) {
      super(e, r), (this.urlAfterRedirects = n), (this.type = re.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  De = (function (t) {
    return (
      (t[(t.Redirect = 0)] = "Redirect"),
      (t[(t.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (t[(t.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (t[(t.GuardRejected = 3)] = "GuardRejected"),
      t
    );
  })(De || {}),
  Tu = (function (t) {
    return (
      (t[(t.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      t
    );
  })(Tu || {}),
  vt = class extends _e {
    constructor(e, r, n, o) {
      super(e, r),
        (this.reason = n),
        (this.code = o),
        (this.type = re.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  qt = class extends _e {
    constructor(e, r, n, o) {
      super(e, r),
        (this.reason = n),
        (this.code = o),
        (this.type = re.NavigationSkipped);
    }
  },
  _r = class extends _e {
    constructor(e, r, n, o) {
      super(e, r),
        (this.error = n),
        (this.target = o),
        (this.type = re.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Mi = class extends _e {
    constructor(e, r, n, o) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = o),
        (this.type = re.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Au = class extends _e {
    constructor(e, r, n, o) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = o),
        (this.type = re.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Nu = class extends _e {
    constructor(e, r, n, o, i) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = o),
        (this.shouldActivate = i),
        (this.type = re.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  Ou = class extends _e {
    constructor(e, r, n, o) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = o),
        (this.type = re.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Ru = class extends _e {
    constructor(e, r, n, o) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = o),
        (this.type = re.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Fu = class {
    constructor(e) {
      (this.route = e), (this.type = re.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Pu = class {
    constructor(e) {
      (this.route = e), (this.type = re.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  ku = class {
    constructor(e) {
      (this.snapshot = e), (this.type = re.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  },
  Lu = class {
    constructor(e) {
      (this.snapshot = e), (this.type = re.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  },
  Vu = class {
    constructor(e) {
      (this.snapshot = e), (this.type = re.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  },
  ju = class {
    constructor(e) {
      (this.snapshot = e), (this.type = re.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  };
var Sr = class {},
  xr = class {
    constructor(e) {
      this.url = e;
    }
  };
var $u = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new Oi()),
        (this.attachRef = null);
    }
  },
  Oi = (() => {
    let e = class e {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(n, o) {
        let i = this.getOrCreateContext(n);
        (i.outlet = o), this.contexts.set(n, i);
      }
      onChildOutletDestroyed(n) {
        let o = this.getContext(n);
        o && ((o.outlet = null), (o.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let o = this.getContext(n);
        return o || ((o = new $u()), this.contexts.set(n, o)), o;
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  _i = class {
    constructor(e) {
      this._root = e;
    }
    get root() {
      return this._root.value;
    }
    parent(e) {
      let r = this.pathFromRoot(e);
      return r.length > 1 ? r[r.length - 2] : null;
    }
    children(e) {
      let r = Uu(e, this._root);
      return r ? r.children.map((n) => n.value) : [];
    }
    firstChild(e) {
      let r = Uu(e, this._root);
      return r && r.children.length > 0 ? r.children[0].value : null;
    }
    siblings(e) {
      let r = Bu(e, this._root);
      return r.length < 2
        ? []
        : r[r.length - 2].children.map((o) => o.value).filter((o) => o !== e);
    }
    pathFromRoot(e) {
      return Bu(e, this._root).map((r) => r.value);
    }
  };
function Uu(t, e) {
  if (t === e.value) return e;
  for (let r of e.children) {
    let n = Uu(t, r);
    if (n) return n;
  }
  return null;
}
function Bu(t, e) {
  if (t === e.value) return [e];
  for (let r of e.children) {
    let n = Bu(t, r);
    if (n.length) return n.unshift(e), n;
  }
  return [];
}
var ye = class {
  constructor(e, r) {
    (this.value = e), (this.children = r);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function Nn(t) {
  let e = {};
  return t && t.children.forEach((r) => (e[r.value.outlet] = r)), e;
}
var Si = class extends _i {
  constructor(e, r) {
    super(e), (this.snapshot = r), Xu(this, e);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function _h(t) {
  let e = gw(t),
    r = new ee([new zt("", {})]),
    n = new ee({}),
    o = new ee({}),
    i = new ee({}),
    s = new ee(""),
    a = new Wt(r, n, i, s, o, _, t, e.root);
  return (a.snapshot = e.root), new Si(new ye(a, []), e);
}
function gw(t) {
  let e = {},
    r = {},
    n = {},
    o = "",
    i = new Tr([], e, n, o, r, _, t, null, {});
  return new xi("", new ye(i, []));
}
var Wt = class {
  constructor(e, r, n, o, i, s, a, u) {
    (this.urlSubject = e),
      (this.paramsSubject = r),
      (this.queryParamsSubject = n),
      (this.fragmentSubject = o),
      (this.dataSubject = i),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = u),
      (this.title = this.dataSubject?.pipe(N((c) => c[Or])) ?? w(void 0)),
      (this.url = e),
      (this.params = r),
      (this.queryParams = n),
      (this.fragment = o),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(N((e) => Fn(e)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(N((e) => Fn(e)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function Ju(t, e, r = "emptyOnly") {
  let n,
    { routeConfig: o } = t;
  return (
    e !== null &&
    (r === "always" ||
      o?.path === "" ||
      (!e.component && !e.routeConfig?.loadComponent))
      ? (n = {
          params: p(p({}, e.params), t.params),
          data: p(p({}, e.data), t.data),
          resolve: p(p(p(p({}, t.data), e.data), o?.data), t._resolvedData),
        })
      : (n = {
          params: p({}, t.params),
          data: p({}, t.data),
          resolve: p(p({}, t.data), t._resolvedData ?? {}),
        }),
    o && xh(o) && (n.resolve[Or] = o.title),
    n
  );
}
var Tr = class {
    get title() {
      return this.data?.[Or];
    }
    constructor(e, r, n, o, i, s, a, u, c) {
      (this.url = e),
        (this.params = r),
        (this.queryParams = n),
        (this.fragment = o),
        (this.data = i),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = u),
        (this._resolve = c);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= Fn(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Fn(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let e = this.url.map((n) => n.toString()).join("/"),
        r = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${e}', path:'${r}')`;
    }
  },
  xi = class extends _i {
    constructor(e, r) {
      super(r), (this.url = e), Xu(this, r);
    }
    toString() {
      return Sh(this._root);
    }
  };
function Xu(t, e) {
  (e.value._routerState = t), e.children.forEach((r) => Xu(t, r));
}
function Sh(t) {
  let e = t.children.length > 0 ? ` { ${t.children.map(Sh).join(", ")} } ` : "";
  return `${t.value}${e}`;
}
function Eu(t) {
  if (t.snapshot) {
    let e = t.snapshot,
      r = t._futureSnapshot;
    (t.snapshot = r),
      He(e.queryParams, r.queryParams) ||
        t.queryParamsSubject.next(r.queryParams),
      e.fragment !== r.fragment && t.fragmentSubject.next(r.fragment),
      He(e.params, r.params) || t.paramsSubject.next(r.params),
      zC(e.url, r.url) || t.urlSubject.next(r.url),
      He(e.data, r.data) || t.dataSubject.next(r.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function Hu(t, e) {
  let r = He(t.params, e.params) && ZC(t.url, e.url),
    n = !t.parent != !e.parent;
  return r && !n && (!t.parent || Hu(t.parent, e.parent));
}
function xh(t) {
  return typeof t.title == "string" || t.title === null;
}
var ec = (() => {
    let e = class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = _),
          (this.activateEvents = new X()),
          (this.deactivateEvents = new X()),
          (this.attachEvents = new X()),
          (this.detachEvents = new X()),
          (this.parentContexts = g(Oi)),
          (this.location = g(_n)),
          (this.changeDetector = g(Ut)),
          (this.environmentInjector = g(Ee)),
          (this.inputBinder = g(tc, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: o, previousValue: i } = n.name;
          if (o) return;
          this.isTrackedInParentContexts(i) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new y(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new y(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new y(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, o) {
        (this.activated = n),
          (this._activatedRoute = o),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, o) {
        if (this.isActivated) throw new y(4013, !1);
        this._activatedRoute = n;
        let i = this.location,
          a = n.snapshot.component,
          u = this.parentContexts.getOrCreateContext(this.name).children,
          c = new zu(n, u, i.injector);
        (this.activated = i.createComponent(a, {
          index: i.length,
          injector: c,
          environmentInjector: o ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵdir = fe({
        type: e,
        selectors: [["router-outlet"]],
        inputs: { name: "name" },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        standalone: !0,
        features: [et],
      }));
    let t = e;
    return t;
  })(),
  zu = class t {
    __ngOutletInjector(e) {
      return new t(this.route, this.childContexts, e);
    }
    constructor(e, r, n) {
      (this.route = e), (this.childContexts = r), (this.parent = n);
    }
    get(e, r) {
      return e === Wt
        ? this.route
        : e === Oi
          ? this.childContexts
          : this.parent.get(e, r);
    }
  },
  tc = new M("");
function mw(t, e, r) {
  let n = Ar(t, e._root, r ? r._root : void 0);
  return new Si(n, e);
}
function Ar(t, e, r) {
  if (r && t.shouldReuseRoute(e.value, r.value.snapshot)) {
    let n = r.value;
    n._futureSnapshot = e.value;
    let o = vw(t, e, r);
    return new ye(n, o);
  } else {
    if (t.shouldAttach(e.value)) {
      let i = t.retrieve(e.value);
      if (i !== null) {
        let s = i.route;
        return (
          (s.value._futureSnapshot = e.value),
          (s.children = e.children.map((a) => Ar(t, a))),
          s
        );
      }
    }
    let n = yw(e.value),
      o = e.children.map((i) => Ar(t, i));
    return new ye(n, o);
  }
}
function vw(t, e, r) {
  return e.children.map((n) => {
    for (let o of r.children)
      if (t.shouldReuseRoute(n.value, o.value.snapshot)) return Ar(t, n, o);
    return Ar(t, n);
  });
}
function yw(t) {
  return new Wt(
    new ee(t.url),
    new ee(t.params),
    new ee(t.queryParams),
    new ee(t.fragment),
    new ee(t.data),
    t.outlet,
    t.component,
    t,
  );
}
var Th = "ngNavigationCancelingError";
function Ah(t, e) {
  let { redirectTo: r, navigationBehaviorOptions: n } = Pn(e)
      ? { redirectTo: e, navigationBehaviorOptions: void 0 }
      : e,
    o = Nh(!1, De.Redirect);
  return (o.url = r), (o.navigationBehaviorOptions = n), o;
}
function Nh(t, e) {
  let r = new Error(`NavigationCancelingError: ${t || ""}`);
  return (r[Th] = !0), (r.cancellationCode = e), r;
}
function Dw(t) {
  return Oh(t) && Pn(t.url);
}
function Oh(t) {
  return !!t && t[Th];
}
var Cw = (() => {
  let e = class e {};
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["ng-component"]],
      standalone: !0,
      features: [Y],
      decls: 1,
      vars: 0,
      template: function (o, i) {
        o & 1 && B(0, "router-outlet");
      },
      dependencies: [ec],
      encapsulation: 2,
    }));
  let t = e;
  return t;
})();
function ww(t, e) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = au(t.providers, e, `Route: ${t.path}`)),
    t._injector ?? e
  );
}
function nc(t) {
  let e = t.children && t.children.map(nc),
    r = e ? $(p({}, t), { children: e }) : p({}, t);
  return (
    !r.component &&
      !r.loadComponent &&
      (e || r.loadChildren) &&
      r.outlet &&
      r.outlet !== _ &&
      (r.component = Cw),
    r
  );
}
function ze(t) {
  return t.outlet || _;
}
function Ew(t, e) {
  let r = t.filter((n) => ze(n) === e);
  return r.push(...t.filter((n) => ze(n) !== e)), r;
}
function Rr(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let e = t.parent; e; e = e.parent) {
    let r = e.routeConfig;
    if (r?._loadedInjector) return r._loadedInjector;
    if (r?._injector) return r._injector;
  }
  return null;
}
var Iw = (t, e, r, n) =>
    N(
      (o) => (
        new Gu(e, o.targetRouterState, o.currentRouterState, r, n).activate(t),
        o
      ),
    ),
  Gu = class {
    constructor(e, r, n, o, i) {
      (this.routeReuseStrategy = e),
        (this.futureState = r),
        (this.currState = n),
        (this.forwardEvent = o),
        (this.inputBindingEnabled = i);
    }
    activate(e) {
      let r = this.futureState._root,
        n = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(r, n, e),
        Eu(this.futureState.root),
        this.activateChildRoutes(r, n, e);
    }
    deactivateChildRoutes(e, r, n) {
      let o = Nn(r);
      e.children.forEach((i) => {
        let s = i.value.outlet;
        this.deactivateRoutes(i, o[s], n), delete o[s];
      }),
        Object.values(o).forEach((i) => {
          this.deactivateRouteAndItsChildren(i, n);
        });
    }
    deactivateRoutes(e, r, n) {
      let o = e.value,
        i = r ? r.value : null;
      if (o === i)
        if (o.component) {
          let s = n.getContext(o.outlet);
          s && this.deactivateChildRoutes(e, r, s.children);
        } else this.deactivateChildRoutes(e, r, n);
      else i && this.deactivateRouteAndItsChildren(r, n);
    }
    deactivateRouteAndItsChildren(e, r) {
      e.value.component &&
      this.routeReuseStrategy.shouldDetach(e.value.snapshot)
        ? this.detachAndStoreRouteSubtree(e, r)
        : this.deactivateRouteAndOutlet(e, r);
    }
    detachAndStoreRouteSubtree(e, r) {
      let n = r.getContext(e.value.outlet),
        o = n && e.value.component ? n.children : r,
        i = Nn(e);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      if (n && n.outlet) {
        let s = n.outlet.detach(),
          a = n.children.onOutletDeactivated();
        this.routeReuseStrategy.store(e.value.snapshot, {
          componentRef: s,
          route: e,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(e, r) {
      let n = r.getContext(e.value.outlet),
        o = n && e.value.component ? n.children : r,
        i = Nn(e);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      n &&
        (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
        (n.attachRef = null),
        (n.route = null));
    }
    activateChildRoutes(e, r, n) {
      let o = Nn(r);
      e.children.forEach((i) => {
        this.activateRoutes(i, o[i.value.outlet], n),
          this.forwardEvent(new ju(i.value.snapshot));
      }),
        e.children.length && this.forwardEvent(new Lu(e.value.snapshot));
    }
    activateRoutes(e, r, n) {
      let o = e.value,
        i = r ? r.value : null;
      if ((Eu(o), o === i))
        if (o.component) {
          let s = n.getOrCreateContext(o.outlet);
          this.activateChildRoutes(e, r, s.children);
        } else this.activateChildRoutes(e, r, n);
      else if (o.component) {
        let s = n.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(o.snapshot);
          this.routeReuseStrategy.store(o.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            Eu(a.route.value),
            this.activateChildRoutes(e, null, s.children);
        } else {
          let a = Rr(o.snapshot);
          (s.attachRef = null),
            (s.route = o),
            (s.injector = a),
            s.outlet && s.outlet.activateWith(o, s.injector),
            this.activateChildRoutes(e, null, s.children);
        }
      } else this.activateChildRoutes(e, null, n);
    }
  },
  Ti = class {
    constructor(e) {
      (this.path = e), (this.route = this.path[this.path.length - 1]);
    }
  },
  Rn = class {
    constructor(e, r) {
      (this.component = e), (this.route = r);
    }
  };
function bw(t, e, r) {
  let n = t._root,
    o = e ? e._root : null;
  return Dr(n, o, r, [n.value]);
}
function Mw(t) {
  let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !e || e.length === 0 ? null : { node: t, guards: e };
}
function Ln(t, e) {
  let r = Symbol(),
    n = e.get(t, r);
  return n === r ? (typeof t == "function" && !Vl(t) ? t : e.get(t)) : n;
}
function Dr(
  t,
  e,
  r,
  n,
  o = { canDeactivateChecks: [], canActivateChecks: [] },
) {
  let i = Nn(e);
  return (
    t.children.forEach((s) => {
      _w(s, i[s.value.outlet], r, n.concat([s.value]), o),
        delete i[s.value.outlet];
    }),
    Object.entries(i).forEach(([s, a]) => Ir(a, r.getContext(s), o)),
    o
  );
}
function _w(
  t,
  e,
  r,
  n,
  o = { canDeactivateChecks: [], canActivateChecks: [] },
) {
  let i = t.value,
    s = e ? e.value : null,
    a = r ? r.getContext(t.value.outlet) : null;
  if (s && i.routeConfig === s.routeConfig) {
    let u = Sw(s, i, i.routeConfig.runGuardsAndResolvers);
    u
      ? o.canActivateChecks.push(new Ti(n))
      : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
      i.component ? Dr(t, e, a ? a.children : null, n, o) : Dr(t, e, r, n, o),
      u &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        o.canDeactivateChecks.push(new Rn(a.outlet.component, s));
  } else
    s && Ir(e, a, o),
      o.canActivateChecks.push(new Ti(n)),
      i.component
        ? Dr(t, null, a ? a.children : null, n, o)
        : Dr(t, null, r, n, o);
  return o;
}
function Sw(t, e, r) {
  if (typeof r == "function") return r(t, e);
  switch (r) {
    case "pathParamsChange":
      return !Gt(t.url, e.url);
    case "pathParamsOrQueryParamsChange":
      return !Gt(t.url, e.url) || !He(t.queryParams, e.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !Hu(t, e) || !He(t.queryParams, e.queryParams);
    case "paramsChange":
    default:
      return !Hu(t, e);
  }
}
function Ir(t, e, r) {
  let n = Nn(t),
    o = t.value;
  Object.entries(n).forEach(([i, s]) => {
    o.component
      ? e
        ? Ir(s, e.children.getContext(i), r)
        : Ir(s, null, r)
      : Ir(s, e, r);
  }),
    o.component
      ? e && e.outlet && e.outlet.isActivated
        ? r.canDeactivateChecks.push(new Rn(e.outlet.component, o))
        : r.canDeactivateChecks.push(new Rn(null, o))
      : r.canDeactivateChecks.push(new Rn(null, o));
}
function Fr(t) {
  return typeof t == "function";
}
function xw(t) {
  return typeof t == "boolean";
}
function Tw(t) {
  return t && Fr(t.canLoad);
}
function Aw(t) {
  return t && Fr(t.canActivate);
}
function Nw(t) {
  return t && Fr(t.canActivateChild);
}
function Ow(t) {
  return t && Fr(t.canDeactivate);
}
function Rw(t) {
  return t && Fr(t.canMatch);
}
function Rh(t) {
  return t instanceof We || t?.name === "EmptyError";
}
var yi = Symbol("INITIAL_VALUE");
function kn() {
  return Ae((t) =>
    lo(t.map((e) => e.pipe(Ze(1), ms(yi)))).pipe(
      N((e) => {
        for (let r of e)
          if (r !== !0) {
            if (r === yi) return yi;
            if (r === !1 || r instanceof mt) return r;
          }
        return !0;
      }),
      Te((e) => e !== yi),
      Ze(1),
    ),
  );
}
function Fw(t, e) {
  return K((r) => {
    let {
      targetSnapshot: n,
      currentSnapshot: o,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = r;
    return s.length === 0 && i.length === 0
      ? w($(p({}, r), { guardsResult: !0 }))
      : Pw(s, n, o, t).pipe(
          K((a) => (a && xw(a) ? kw(n, i, t, e) : w(a))),
          N((a) => $(p({}, r), { guardsResult: a })),
        );
  });
}
function Pw(t, e, r, n) {
  return G(t).pipe(
    K((o) => Uw(o.component, o.route, r, e, n)),
    Pe((o) => o !== !0, !0),
  );
}
function kw(t, e, r, n) {
  return G(e).pipe(
    un((o) =>
      an(
        Vw(o.route.parent, n),
        Lw(o.route, n),
        $w(t, o.path, r),
        jw(t, o.route, r),
      ),
    ),
    Pe((o) => o !== !0, !0),
  );
}
function Lw(t, e) {
  return t !== null && e && e(new Vu(t)), w(!0);
}
function Vw(t, e) {
  return t !== null && e && e(new ku(t)), w(!0);
}
function jw(t, e, r) {
  let n = e.routeConfig ? e.routeConfig.canActivate : null;
  if (!n || n.length === 0) return w(!0);
  let o = n.map((i) =>
    fo(() => {
      let s = Rr(e) ?? r,
        a = Ln(i, s),
        u = Aw(a) ? a.canActivate(e, t) : Vt(s, () => a(e, t));
      return yt(u).pipe(Pe());
    }),
  );
  return w(o).pipe(kn());
}
function $w(t, e, r) {
  let n = e[e.length - 1],
    i = e
      .slice(0, e.length - 1)
      .reverse()
      .map((s) => Mw(s))
      .filter((s) => s !== null)
      .map((s) =>
        fo(() => {
          let a = s.guards.map((u) => {
            let c = Rr(s.node) ?? r,
              l = Ln(u, c),
              d = Nw(l) ? l.canActivateChild(n, t) : Vt(c, () => l(n, t));
            return yt(d).pipe(Pe());
          });
          return w(a).pipe(kn());
        }),
      );
  return w(i).pipe(kn());
}
function Uw(t, e, r, n, o) {
  let i = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return w(!0);
  let s = i.map((a) => {
    let u = Rr(e) ?? o,
      c = Ln(a, u),
      l = Ow(c) ? c.canDeactivate(t, e, r, n) : Vt(u, () => c(t, e, r, n));
    return yt(l).pipe(Pe());
  });
  return w(s).pipe(kn());
}
function Bw(t, e, r, n) {
  let o = e.canLoad;
  if (o === void 0 || o.length === 0) return w(!0);
  let i = o.map((s) => {
    let a = Ln(s, t),
      u = Tw(a) ? a.canLoad(e, r) : Vt(t, () => a(e, r));
    return yt(u);
  });
  return w(i).pipe(kn(), Fh(n));
}
function Fh(t) {
  return as(
    te((e) => {
      if (Pn(e)) throw Ah(t, e);
    }),
    N((e) => e === !0),
  );
}
function Hw(t, e, r, n) {
  let o = e.canMatch;
  if (!o || o.length === 0) return w(!0);
  let i = o.map((s) => {
    let a = Ln(s, t),
      u = Rw(a) ? a.canMatch(e, r) : Vt(t, () => a(e, r));
    return yt(u);
  });
  return w(i).pipe(kn(), Fh(n));
}
var Nr = class {
    constructor(e) {
      this.segmentGroup = e || null;
    }
  },
  Ai = class extends Error {
    constructor(e) {
      super(), (this.urlTree = e);
    }
  };
function An(t) {
  return on(new Nr(t));
}
function zw(t) {
  return on(new y(4e3, !1));
}
function Gw(t) {
  return on(Nh(!1, De.GuardRejected));
}
var qu = class {
    constructor(e, r) {
      (this.urlSerializer = e), (this.urlTree = r);
    }
    lineralizeSegments(e, r) {
      let n = [],
        o = r.root;
      for (;;) {
        if (((n = n.concat(o.segments)), o.numberOfChildren === 0)) return w(n);
        if (o.numberOfChildren > 1 || !o.children[_]) return zw(e.redirectTo);
        o = o.children[_];
      }
    }
    applyRedirectCommands(e, r, n) {
      let o = this.applyRedirectCreateUrlTree(
        r,
        this.urlSerializer.parse(r),
        e,
        n,
      );
      if (r.startsWith("/")) throw new Ai(o);
      return o;
    }
    applyRedirectCreateUrlTree(e, r, n, o) {
      let i = this.createSegmentGroup(e, r.root, n, o);
      return new mt(
        i,
        this.createQueryParams(r.queryParams, this.urlTree.queryParams),
        r.fragment,
      );
    }
    createQueryParams(e, r) {
      let n = {};
      return (
        Object.entries(e).forEach(([o, i]) => {
          if (typeof i == "string" && i.startsWith(":")) {
            let a = i.substring(1);
            n[o] = r[a];
          } else n[o] = i;
        }),
        n
      );
    }
    createSegmentGroup(e, r, n, o) {
      let i = this.createSegments(e, r.segments, n, o),
        s = {};
      return (
        Object.entries(r.children).forEach(([a, u]) => {
          s[a] = this.createSegmentGroup(e, u, n, o);
        }),
        new j(i, s)
      );
    }
    createSegments(e, r, n, o) {
      return r.map((i) =>
        i.path.startsWith(":")
          ? this.findPosParam(e, i, o)
          : this.findOrReturn(i, n),
      );
    }
    findPosParam(e, r, n) {
      let o = n[r.path.substring(1)];
      if (!o) throw new y(4001, !1);
      return o;
    }
    findOrReturn(e, r) {
      let n = 0;
      for (let o of r) {
        if (o.path === e.path) return r.splice(n), o;
        n++;
      }
      return e;
    }
  },
  Wu = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function qw(t, e, r, n, o) {
  let i = rc(t, e, r);
  return i.matched
    ? ((n = ww(e, n)),
      Hw(n, e, r, o).pipe(N((s) => (s === !0 ? i : p({}, Wu)))))
    : w(i);
}
function rc(t, e, r) {
  if (e.path === "**") return Ww(r);
  if (e.path === "")
    return e.pathMatch === "full" && (t.hasChildren() || r.length > 0)
      ? p({}, Wu)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: r,
          parameters: {},
          positionalParamSegments: {},
        };
  let o = (e.matcher || HC)(r, t, e);
  if (!o) return p({}, Wu);
  let i = {};
  Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
    i[a] = u.path;
  });
  let s =
    o.consumed.length > 0
      ? p(p({}, i), o.consumed[o.consumed.length - 1].parameters)
      : i;
  return {
    matched: !0,
    consumedSegments: o.consumed,
    remainingSegments: r.slice(o.consumed.length),
    parameters: s,
    positionalParamSegments: o.posParams ?? {},
  };
}
function Ww(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? hh(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function dh(t, e, r, n) {
  return r.length > 0 && Qw(t, r, n)
    ? {
        segmentGroup: new j(e, Yw(n, new j(r, t.children))),
        slicedSegments: [],
      }
    : r.length === 0 && Kw(t, r, n)
      ? {
          segmentGroup: new j(t.segments, Zw(t, r, n, t.children)),
          slicedSegments: r,
        }
      : { segmentGroup: new j(t.segments, t.children), slicedSegments: r };
}
function Zw(t, e, r, n) {
  let o = {};
  for (let i of r)
    if (Ri(t, e, i) && !n[ze(i)]) {
      let s = new j([], {});
      o[ze(i)] = s;
    }
  return p(p({}, n), o);
}
function Yw(t, e) {
  let r = {};
  r[_] = e;
  for (let n of t)
    if (n.path === "" && ze(n) !== _) {
      let o = new j([], {});
      r[ze(n)] = o;
    }
  return r;
}
function Qw(t, e, r) {
  return r.some((n) => Ri(t, e, n) && ze(n) !== _);
}
function Kw(t, e, r) {
  return r.some((n) => Ri(t, e, n));
}
function Ri(t, e, r) {
  return (t.hasChildren() || e.length > 0) && r.pathMatch === "full"
    ? !1
    : r.path === "";
}
function Jw(t, e, r, n) {
  return ze(t) !== n && (n === _ || !Ri(e, r, t)) ? !1 : rc(e, t, r).matched;
}
function Xw(t, e, r) {
  return e.length === 0 && !t.children[r];
}
var Zu = class {};
function eE(t, e, r, n, o, i, s = "emptyOnly") {
  return new Yu(t, e, r, n, o, s, i).recognize();
}
var tE = 31,
  Yu = class {
    constructor(e, r, n, o, i, s, a) {
      (this.injector = e),
        (this.configLoader = r),
        (this.rootComponentType = n),
        (this.config = o),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new qu(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(e) {
      return new y(4002, `'${e.segmentGroup}'`);
    }
    recognize() {
      let e = dh(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(e).pipe(
        N((r) => {
          let n = new Tr(
              [],
              Object.freeze({}),
              Object.freeze(p({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              _,
              this.rootComponentType,
              null,
              {},
            ),
            o = new ye(n, r),
            i = new xi("", o),
            s = uw(n, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(s)),
            this.inheritParamsAndData(i._root, null),
            { state: i, tree: s }
          );
        }),
      );
    }
    match(e) {
      return this.processSegmentGroup(this.injector, this.config, e, _).pipe(
        it((n) => {
          if (n instanceof Ai)
            return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
          throw n instanceof Nr ? this.noMatchError(n) : n;
        }),
      );
    }
    inheritParamsAndData(e, r) {
      let n = e.value,
        o = Ju(n, r, this.paramsInheritanceStrategy);
      (n.params = Object.freeze(o.params)),
        (n.data = Object.freeze(o.data)),
        e.children.forEach((i) => this.inheritParamsAndData(i, n));
    }
    processSegmentGroup(e, r, n, o) {
      return n.segments.length === 0 && n.hasChildren()
        ? this.processChildren(e, r, n)
        : this.processSegment(e, r, n, n.segments, o, !0).pipe(
            N((i) => (i instanceof ye ? [i] : [])),
          );
    }
    processChildren(e, r, n) {
      let o = [];
      for (let i of Object.keys(n.children))
        i === "primary" ? o.unshift(i) : o.push(i);
      return G(o).pipe(
        un((i) => {
          let s = n.children[i],
            a = Ew(r, i);
          return this.processSegmentGroup(e, a, s, i);
        }),
        gs((i, s) => (i.push(...s), i)),
        st(null),
        ps(),
        K((i) => {
          if (i === null) return An(n);
          let s = Ph(i);
          return nE(s), w(s);
        }),
      );
    }
    processSegment(e, r, n, o, i, s) {
      return G(r).pipe(
        un((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? e,
            r,
            a,
            n,
            o,
            i,
            s,
          ).pipe(
            it((u) => {
              if (u instanceof Nr) return w(null);
              throw u;
            }),
          ),
        ),
        Pe((a) => !!a),
        it((a) => {
          if (Rh(a)) return Xw(n, o, i) ? w(new Zu()) : An(n);
          throw a;
        }),
      );
    }
    processSegmentAgainstRoute(e, r, n, o, i, s, a) {
      return Jw(n, o, i, s)
        ? n.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(e, o, n, i, s)
          : this.allowRedirects && a
            ? this.expandSegmentAgainstRouteUsingRedirect(e, o, r, n, i, s)
            : An(o)
        : An(o);
    }
    expandSegmentAgainstRouteUsingRedirect(e, r, n, o, i, s) {
      let {
        matched: a,
        consumedSegments: u,
        positionalParamSegments: c,
        remainingSegments: l,
      } = rc(r, o, i);
      if (!a) return An(r);
      o.redirectTo.startsWith("/") &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > tE && (this.allowRedirects = !1));
      let d = this.applyRedirects.applyRedirectCommands(u, o.redirectTo, c);
      return this.applyRedirects
        .lineralizeSegments(o, d)
        .pipe(K((f) => this.processSegment(e, n, r, f.concat(l), s, !1)));
    }
    matchSegmentAgainstRoute(e, r, n, o, i) {
      let s = qw(r, n, o, e, this.urlSerializer);
      return (
        n.path === "**" && (r.children = {}),
        s.pipe(
          Ae((a) =>
            a.matched
              ? ((e = n._injector ?? e),
                this.getChildConfig(e, n, o).pipe(
                  Ae(({ routes: u }) => {
                    let c = n._loadedInjector ?? e,
                      {
                        consumedSegments: l,
                        remainingSegments: d,
                        parameters: f,
                      } = a,
                      h = new Tr(
                        l,
                        f,
                        Object.freeze(p({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        oE(n),
                        ze(n),
                        n.component ?? n._loadedComponent ?? null,
                        n,
                        iE(n),
                      ),
                      { segmentGroup: m, slicedSegments: T } = dh(r, l, d, u);
                    if (T.length === 0 && m.hasChildren())
                      return this.processChildren(c, u, m).pipe(
                        N((L) => (L === null ? null : new ye(h, L))),
                      );
                    if (u.length === 0 && T.length === 0)
                      return w(new ye(h, []));
                    let z = ze(n) === i;
                    return this.processSegment(c, u, m, T, z ? _ : i, !0).pipe(
                      N((L) => new ye(h, L instanceof ye ? [L] : [])),
                    );
                  }),
                ))
              : An(r),
          ),
        )
      );
    }
    getChildConfig(e, r, n) {
      return r.children
        ? w({ routes: r.children, injector: e })
        : r.loadChildren
          ? r._loadedRoutes !== void 0
            ? w({ routes: r._loadedRoutes, injector: r._loadedInjector })
            : Bw(e, r, n, this.urlSerializer).pipe(
                K((o) =>
                  o
                    ? this.configLoader.loadChildren(e, r).pipe(
                        te((i) => {
                          (r._loadedRoutes = i.routes),
                            (r._loadedInjector = i.injector);
                        }),
                      )
                    : Gw(r),
                ),
              )
          : w({ routes: [], injector: e });
    }
  };
function nE(t) {
  t.sort((e, r) =>
    e.value.outlet === _
      ? -1
      : r.value.outlet === _
        ? 1
        : e.value.outlet.localeCompare(r.value.outlet),
  );
}
function rE(t) {
  let e = t.value.routeConfig;
  return e && e.path === "";
}
function Ph(t) {
  let e = [],
    r = new Set();
  for (let n of t) {
    if (!rE(n)) {
      e.push(n);
      continue;
    }
    let o = e.find((i) => n.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...n.children), r.add(o)) : e.push(n);
  }
  for (let n of r) {
    let o = Ph(n.children);
    e.push(new ye(n.value, o));
  }
  return e.filter((n) => !r.has(n));
}
function oE(t) {
  return t.data || {};
}
function iE(t) {
  return t.resolve || {};
}
function sE(t, e, r, n, o, i) {
  return K((s) =>
    eE(t, e, r, n, s.extractedUrl, o, i).pipe(
      N(({ state: a, tree: u }) =>
        $(p({}, s), { targetSnapshot: a, urlAfterRedirects: u }),
      ),
    ),
  );
}
function aE(t, e) {
  return K((r) => {
    let {
      targetSnapshot: n,
      guards: { canActivateChecks: o },
    } = r;
    if (!o.length) return w(r);
    let i = new Set(o.map((u) => u.route)),
      s = new Set();
    for (let u of i) if (!s.has(u)) for (let c of kh(u)) s.add(c);
    let a = 0;
    return G(s).pipe(
      un((u) =>
        i.has(u)
          ? uE(u, n, t, e)
          : ((u.data = Ju(u, u.parent, t).resolve), w(void 0)),
      ),
      te(() => a++),
      cn(1),
      K((u) => (a === s.size ? w(r) : me)),
    );
  });
}
function kh(t) {
  let e = t.children.map((r) => kh(r)).flat();
  return [t, ...e];
}
function uE(t, e, r, n) {
  let o = t.routeConfig,
    i = t._resolve;
  return (
    o?.title !== void 0 && !xh(o) && (i[Or] = o.title),
    cE(i, t, e, n).pipe(
      N(
        (s) => (
          (t._resolvedData = s), (t.data = Ju(t, t.parent, r).resolve), null
        ),
      ),
    )
  );
}
function cE(t, e, r, n) {
  let o = Mu(t);
  if (o.length === 0) return w({});
  let i = {};
  return G(o).pipe(
    K((s) =>
      lE(t[s], e, r, n).pipe(
        Pe(),
        te((a) => {
          i[s] = a;
        }),
      ),
    ),
    cn(1),
    hs(i),
    it((s) => (Rh(s) ? me : on(s))),
  );
}
function lE(t, e, r, n) {
  let o = Rr(e) ?? n,
    i = Ln(t, o),
    s = i.resolve ? i.resolve(e, r) : Vt(o, () => i(e, r));
  return yt(s);
}
function Iu(t) {
  return Ae((e) => {
    let r = t(e);
    return r ? G(r).pipe(N(() => e)) : w(e);
  });
}
var Lh = (() => {
    let e = class e {
      buildTitle(n) {
        let o,
          i = n.root;
        for (; i !== void 0; )
          (o = this.getResolvedTitleForRoute(i) ?? o),
            (i = i.children.find((s) => s.outlet === _));
        return o;
      }
      getResolvedTitleForRoute(n) {
        return n.data[Or];
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: () => g(dE), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  dE = (() => {
    let e = class e extends Lh {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let o = this.buildTitle(n);
        o !== void 0 && this.title.setTitle(o);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(R(gt));
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  oc = new M("", { providedIn: "root", factory: () => ({}) }),
  ic = new M(""),
  fE = (() => {
    let e = class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = g(cu));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return w(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let o = yt(n.loadComponent()).pipe(
            N(Vh),
            te((s) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = s);
            }),
            zn(() => {
              this.componentLoaders.delete(n);
            }),
          ),
          i = new rn(o, () => new oe()).pipe(nn());
        return this.componentLoaders.set(n, i), i;
      }
      loadChildren(n, o) {
        if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o);
        if (o._loadedRoutes)
          return w({ routes: o._loadedRoutes, injector: o._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(o);
        let s = hE(o, this.compiler, n, this.onLoadEndListener).pipe(
            zn(() => {
              this.childrenLoaders.delete(o);
            }),
          ),
          a = new rn(s, () => new oe()).pipe(nn());
        return this.childrenLoaders.set(o, a), a;
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
function hE(t, e, r, n) {
  return yt(t.loadChildren()).pipe(
    N(Vh),
    K((o) =>
      o instanceof nr || Array.isArray(o) ? w(o) : G(e.compileModuleAsync(o)),
    ),
    N((o) => {
      n && n(t);
      let i,
        s,
        a = !1;
      return (
        Array.isArray(o)
          ? ((s = o), (a = !0))
          : ((i = o.create(r).injector),
            (s = i.get(ic, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(nc), injector: i }
      );
    }),
  );
}
function pE(t) {
  return t && typeof t == "object" && "default" in t;
}
function Vh(t) {
  return pE(t) ? t.default : t;
}
var sc = (() => {
    let e = class e {};
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: () => g(gE), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  gE = (() => {
    let e = class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, o) {
        return n;
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  mE = new M("");
var vE = (() => {
  let e = class e {
    get hasRequestedNavigation() {
      return this.navigationId !== 0;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new oe()),
        (this.transitionAbortSubject = new oe()),
        (this.configLoader = g(fE)),
        (this.environmentInjector = g(Ee)),
        (this.urlSerializer = g(Ku)),
        (this.rootContexts = g(Oi)),
        (this.location = g(pr)),
        (this.inputBindingEnabled = g(tc, { optional: !0 }) !== null),
        (this.titleStrategy = g(Lh)),
        (this.options = g(oc, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy =
          this.options.paramsInheritanceStrategy || "emptyOnly"),
        (this.urlHandlingStrategy = g(sc)),
        (this.createViewTransition = g(mE, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => w(void 0)),
        (this.rootComponentType = null);
      let n = (i) => this.events.next(new Fu(i)),
        o = (i) => this.events.next(new Pu(i));
      (this.configLoader.onLoadEndListener = o),
        (this.configLoader.onLoadStartListener = n);
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(n) {
      let o = ++this.navigationId;
      this.transitions?.next($(p(p({}, this.transitions.value), n), { id: o }));
    }
    setupNavigations(n, o, i) {
      return (
        (this.transitions = new ee({
          id: 0,
          currentUrlTree: o,
          currentRawUrl: o,
          extractedUrl: this.urlHandlingStrategy.extract(o),
          urlAfterRedirects: this.urlHandlingStrategy.extract(o),
          rawUrl: o,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: Er,
          restoredState: null,
          currentSnapshot: i.snapshot,
          targetSnapshot: null,
          currentRouterState: i,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          Te((s) => s.id !== 0),
          N((s) =>
            $(p({}, s), {
              extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl),
            }),
          ),
          Ae((s) => {
            let a = !1,
              u = !1;
            return w(s).pipe(
              Ae((c) => {
                if (this.navigationId > s.id)
                  return (
                    this.cancelNavigationTransition(
                      s,
                      "",
                      De.SupersededByNewNavigation,
                    ),
                    me
                  );
                (this.currentTransition = s),
                  (this.currentNavigation = {
                    id: c.id,
                    initialUrl: c.rawUrl,
                    extractedUrl: c.extractedUrl,
                    trigger: c.source,
                    extras: c.extras,
                    previousNavigation: this.lastSuccessfulNavigation
                      ? $(p({}, this.lastSuccessfulNavigation), {
                          previousNavigation: null,
                        })
                      : null,
                  });
                let l =
                    !n.navigated ||
                    this.isUpdatingInternalState() ||
                    this.isUpdatedBrowserUrl(),
                  d = c.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                if (!l && d !== "reload") {
                  let f = "";
                  return (
                    this.events.next(
                      new qt(
                        c.id,
                        this.urlSerializer.serialize(c.rawUrl),
                        f,
                        Tu.IgnoredSameUrlNavigation,
                      ),
                    ),
                    c.resolve(null),
                    me
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                  return w(c).pipe(
                    Ae((f) => {
                      let h = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new Mr(
                            f.id,
                            this.urlSerializer.serialize(f.extractedUrl),
                            f.source,
                            f.restoredState,
                          ),
                        ),
                        h !== this.transitions?.getValue()
                          ? me
                          : Promise.resolve(f)
                      );
                    }),
                    sE(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      n.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy,
                    ),
                    te((f) => {
                      (s.targetSnapshot = f.targetSnapshot),
                        (s.urlAfterRedirects = f.urlAfterRedirects),
                        (this.currentNavigation = $(
                          p({}, this.currentNavigation),
                          { finalUrl: f.urlAfterRedirects },
                        ));
                      let h = new Mi(
                        f.id,
                        this.urlSerializer.serialize(f.extractedUrl),
                        this.urlSerializer.serialize(f.urlAfterRedirects),
                        f.targetSnapshot,
                      );
                      this.events.next(h);
                    }),
                  );
                if (
                  l &&
                  this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                ) {
                  let {
                      id: f,
                      extractedUrl: h,
                      source: m,
                      restoredState: T,
                      extras: z,
                    } = c,
                    L = new Mr(f, this.urlSerializer.serialize(h), m, T);
                  this.events.next(L);
                  let Ge = _h(this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = s =
                      $(p({}, c), {
                        targetSnapshot: Ge,
                        urlAfterRedirects: h,
                        extras: $(p({}, z), {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })),
                    (this.currentNavigation.finalUrl = h),
                    w(s)
                  );
                } else {
                  let f = "";
                  return (
                    this.events.next(
                      new qt(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        f,
                        Tu.IgnoredByUrlHandlingStrategy,
                      ),
                    ),
                    c.resolve(null),
                    me
                  );
                }
              }),
              te((c) => {
                let l = new Au(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot,
                );
                this.events.next(l);
              }),
              N(
                (c) => (
                  (this.currentTransition = s =
                    $(p({}, c), {
                      guards: bw(
                        c.targetSnapshot,
                        c.currentSnapshot,
                        this.rootContexts,
                      ),
                    })),
                  s
                ),
              ),
              Fw(this.environmentInjector, (c) => this.events.next(c)),
              te((c) => {
                if (((s.guardsResult = c.guardsResult), Pn(c.guardsResult)))
                  throw Ah(this.urlSerializer, c.guardsResult);
                let l = new Nu(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot,
                  !!c.guardsResult,
                );
                this.events.next(l);
              }),
              Te((c) =>
                c.guardsResult
                  ? !0
                  : (this.cancelNavigationTransition(c, "", De.GuardRejected),
                    !1),
              ),
              Iu((c) => {
                if (c.guards.canActivateChecks.length)
                  return w(c).pipe(
                    te((l) => {
                      let d = new Ou(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot,
                      );
                      this.events.next(d);
                    }),
                    Ae((l) => {
                      let d = !1;
                      return w(l).pipe(
                        aE(
                          this.paramsInheritanceStrategy,
                          this.environmentInjector,
                        ),
                        te({
                          next: () => (d = !0),
                          complete: () => {
                            d ||
                              this.cancelNavigationTransition(
                                l,
                                "",
                                De.NoDataFromResolver,
                              );
                          },
                        }),
                      );
                    }),
                    te((l) => {
                      let d = new Ru(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot,
                      );
                      this.events.next(d);
                    }),
                  );
              }),
              Iu((c) => {
                let l = (d) => {
                  let f = [];
                  d.routeConfig?.loadComponent &&
                    !d.routeConfig._loadedComponent &&
                    f.push(
                      this.configLoader.loadComponent(d.routeConfig).pipe(
                        te((h) => {
                          d.component = h;
                        }),
                        N(() => {}),
                      ),
                    );
                  for (let h of d.children) f.push(...l(h));
                  return f;
                };
                return lo(l(c.targetSnapshot.root)).pipe(st(null), Ze(1));
              }),
              Iu(() => this.afterPreactivation()),
              Ae(() => {
                let { currentSnapshot: c, targetSnapshot: l } = s,
                  d = this.createViewTransition?.(
                    this.environmentInjector,
                    c.root,
                    l.root,
                  );
                return d ? G(d).pipe(N(() => s)) : w(s);
              }),
              N((c) => {
                let l = mw(
                  n.routeReuseStrategy,
                  c.targetSnapshot,
                  c.currentRouterState,
                );
                return (
                  (this.currentTransition = s =
                    $(p({}, c), { targetRouterState: l })),
                  (this.currentNavigation.targetRouterState = l),
                  s
                );
              }),
              te(() => {
                this.events.next(new Sr());
              }),
              Iw(
                this.rootContexts,
                n.routeReuseStrategy,
                (c) => this.events.next(c),
                this.inputBindingEnabled,
              ),
              Ze(1),
              te({
                next: (c) => {
                  (a = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new nt(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                      ),
                    ),
                    this.titleStrategy?.updateTitle(
                      c.targetRouterState.snapshot,
                    ),
                    c.resolve(!0);
                },
                complete: () => {
                  a = !0;
                },
              }),
              vs(
                this.transitionAbortSubject.pipe(
                  te((c) => {
                    throw c;
                  }),
                ),
              ),
              zn(() => {
                !a &&
                  !u &&
                  this.cancelNavigationTransition(
                    s,
                    "",
                    De.SupersededByNewNavigation,
                  ),
                  this.currentTransition?.id === s.id &&
                    ((this.currentNavigation = null),
                    (this.currentTransition = null));
              }),
              it((c) => {
                if (((u = !0), Oh(c)))
                  this.events.next(
                    new vt(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      c.message,
                      c.cancellationCode,
                    ),
                  ),
                    Dw(c) ? this.events.next(new xr(c.url)) : s.resolve(!1);
                else {
                  this.events.next(
                    new _r(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      c,
                      s.targetSnapshot ?? void 0,
                    ),
                  );
                  try {
                    s.resolve(n.errorHandler(c));
                  } catch (l) {
                    this.options.resolveNavigationPromiseOnError
                      ? s.resolve(!1)
                      : s.reject(l);
                  }
                }
                return me;
              }),
            );
          }),
        )
      );
    }
    cancelNavigationTransition(n, o, i) {
      let s = new vt(n.id, this.urlSerializer.serialize(n.extractedUrl), o, i);
      this.events.next(s), n.resolve(!1);
    }
    isUpdatingInternalState() {
      return (
        this.currentTransition?.extractedUrl.toString() !==
        this.currentTransition?.currentUrlTree.toString()
      );
    }
    isUpdatedBrowserUrl() {
      return (
        this.urlHandlingStrategy
          .extract(this.urlSerializer.parse(this.location.path(!0)))
          .toString() !== this.currentTransition?.extractedUrl.toString() &&
        !this.currentTransition?.extras.skipLocationChange
      );
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function yE(t) {
  return t !== Er;
}
var DE = (() => {
    let e = class e {};
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: () => g(CE), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Qu = class {
    shouldDetach(e) {
      return !1;
    }
    store(e, r) {}
    shouldAttach(e) {
      return !1;
    }
    retrieve(e) {
      return null;
    }
    shouldReuseRoute(e, r) {
      return e.routeConfig === r.routeConfig;
    }
  },
  CE = (() => {
    let e = class e extends Qu {};
    (e.ɵfac = (() => {
      let n;
      return function (i) {
        return (n || (n = cr(e)))(i || e);
      };
    })()),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  jh = (() => {
    let e = class e {};
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: () => g(wE), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  wE = (() => {
    let e = class e extends jh {
      constructor() {
        super(...arguments),
          (this.location = g(pr)),
          (this.urlSerializer = g(Ku)),
          (this.options = g(oc, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = g(sc)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new mt()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = _h(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((o) => {
          o.type === "popstate" && n(o.url, o.state);
        });
      }
      handleRouterEvent(n, o) {
        if (n instanceof Mr) this.stateMemento = this.createStateMemento();
        else if (n instanceof qt) this.rawUrlTree = o.initialUrl;
        else if (n instanceof Mi) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !o.extras.skipLocationChange
          ) {
            let i = this.urlHandlingStrategy.merge(o.finalUrl, o.initialUrl);
            this.setBrowserUrl(i, o);
          }
        } else
          n instanceof Sr
            ? ((this.currentUrlTree = o.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                o.finalUrl,
                o.initialUrl,
              )),
              (this.routerState = o.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                (o.extras.skipLocationChange ||
                  this.setBrowserUrl(this.rawUrlTree, o)))
            : n instanceof vt &&
                (n.code === De.GuardRejected ||
                  n.code === De.NoDataFromResolver)
              ? this.restoreHistory(o)
              : n instanceof _r
                ? this.restoreHistory(o, !0)
                : n instanceof nt &&
                  ((this.lastSuccessfulId = n.id),
                  (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, o) {
        let i = this.urlSerializer.serialize(n);
        if (this.location.isCurrentPathEqualTo(i) || o.extras.replaceUrl) {
          let s = this.browserPageId,
            a = p(p({}, o.extras.state), this.generateNgRouterState(o.id, s));
          this.location.replaceState(i, "", a);
        } else {
          let s = p(
            p({}, o.extras.state),
            this.generateNgRouterState(o.id, this.browserPageId + 1),
          );
          this.location.go(i, "", s);
        }
      }
      restoreHistory(n, o = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let i = this.browserPageId,
            s = this.currentPageId - i;
          s !== 0
            ? this.location.historyGo(s)
            : this.currentUrlTree === n.finalUrl &&
              s === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (o && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree,
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId),
        );
      }
      generateNgRouterState(n, o) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: o }
          : { navigationId: n };
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (i) {
        return (n || (n = cr(e)))(i || e);
      };
    })()),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Cr = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = "COMPLETE"),
      (t[(t.FAILED = 1)] = "FAILED"),
      (t[(t.REDIRECTING = 2)] = "REDIRECTING"),
      t
    );
  })(Cr || {});
function EE(t, e) {
  t.events
    .pipe(
      Te(
        (r) =>
          r instanceof nt ||
          r instanceof vt ||
          r instanceof _r ||
          r instanceof qt,
      ),
      N((r) =>
        r instanceof nt || r instanceof qt
          ? Cr.COMPLETE
          : (
                r instanceof vt
                  ? r.code === De.Redirect ||
                    r.code === De.SupersededByNewNavigation
                  : !1
              )
            ? Cr.REDIRECTING
            : Cr.FAILED,
      ),
      Te((r) => r !== Cr.REDIRECTING),
      Ze(1),
    )
    .subscribe(() => {
      e();
    });
}
function IE(t) {
  throw t;
}
var bE = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  ME = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  Fi = (() => {
    let e = class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.isNgZoneEnabled = !1),
          (this.console = g(di)),
          (this.stateManager = g(jh)),
          (this.options = g(oc, { optional: !0 }) || {}),
          (this.pendingTasks = g(ri)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = g(vE)),
          (this.urlSerializer = g(Ku)),
          (this.location = g(pr)),
          (this.urlHandlingStrategy = g(sc)),
          (this._events = new oe()),
          (this.errorHandler = this.options.errorHandler || IE),
          (this.navigated = !1),
          (this.routeReuseStrategy = g(DE)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = g(ic, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!g(tc, { optional: !0 })),
          (this.eventsSubscription = new Q()),
          (this.isNgZoneEnabled = g(W) instanceof W && W.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((o) => {
          try {
            let i = this.navigationTransitions.currentTransition,
              s = this.navigationTransitions.currentNavigation;
            if (i !== null && s !== null) {
              if (
                (this.stateManager.handleRouterEvent(o, s),
                o instanceof vt &&
                  o.code !== De.Redirect &&
                  o.code !== De.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (o instanceof nt) this.navigated = !0;
              else if (o instanceof xr) {
                let a = this.urlHandlingStrategy.merge(o.url, i.currentRawUrl),
                  u = {
                    info: i.extras.info,
                    skipLocationChange: i.extras.skipLocationChange,
                    replaceUrl:
                      this.urlUpdateStrategy === "eager" || yE(i.source),
                  };
                this.scheduleNavigation(a, Er, null, u, {
                  resolve: i.resolve,
                  reject: i.reject,
                  promise: i.promise,
                });
              }
            }
            SE(o) && this._events.next(o);
          } catch (i) {
            this.navigationTransitions.transitionAbortSubject.next(i);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              Er,
              this.stateManager.restoredState(),
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, o) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(n, "popstate", o);
              }, 0);
            },
          );
      }
      navigateToSyncWithBrowser(n, o, i) {
        let s = { replaceUrl: !0 },
          a = i?.navigationId ? i : null;
        if (i) {
          let c = p({}, i);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (s.state = c);
        }
        let u = this.parseUrl(n);
        this.scheduleNavigation(u, o, a, s);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(nc)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, o = {}) {
        let {
            relativeTo: i,
            queryParams: s,
            fragment: a,
            queryParamsHandling: u,
            preserveFragment: c,
          } = o,
          l = c ? this.currentUrlTree.fragment : a,
          d = null;
        switch (u) {
          case "merge":
            d = p(p({}, this.currentUrlTree.queryParams), s);
            break;
          case "preserve":
            d = this.currentUrlTree.queryParams;
            break;
          default:
            d = s || null;
        }
        d !== null && (d = this.removeEmptyProps(d));
        let f;
        try {
          let h = i ? i.snapshot : this.routerState.snapshot.root;
          f = Eh(h);
        } catch {
          (typeof n[0] != "string" || !n[0].startsWith("/")) && (n = []),
            (f = this.currentUrlTree.root);
        }
        return Ih(f, n, d, l ?? null);
      }
      navigateByUrl(n, o = { skipLocationChange: !1 }) {
        let i = Pn(n) ? n : this.parseUrl(n),
          s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
        return this.scheduleNavigation(s, Er, null, o);
      }
      navigate(n, o = { skipLocationChange: !1 }) {
        return _E(n), this.navigateByUrl(this.createUrlTree(n, o), o);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, o) {
        let i;
        if (
          (o === !0 ? (i = p({}, bE)) : o === !1 ? (i = p({}, ME)) : (i = o),
          Pn(n))
        )
          return ah(this.currentUrlTree, n, i);
        let s = this.parseUrl(n);
        return ah(this.currentUrlTree, s, i);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (o, [i, s]) => (s != null && (o[i] = s), o),
          {},
        );
      }
      scheduleNavigation(n, o, i, s, a) {
        if (this.disposed) return Promise.resolve(!1);
        let u, c, l;
        a
          ? ((u = a.resolve), (c = a.reject), (l = a.promise))
          : (l = new Promise((f, h) => {
              (u = f), (c = h);
            }));
        let d = this.pendingTasks.add();
        return (
          EE(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(d));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: o,
            restoredState: i,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: s,
            resolve: u,
            reject: c,
            promise: l,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          l.catch((f) => Promise.reject(f))
        );
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
function _E(t) {
  for (let e = 0; e < t.length; e++) if (t[e] == null) throw new y(4008, !1);
}
function SE(t) {
  return !(t instanceof Sr) && !(t instanceof xr);
}
var Ni = (() => {
    let e = class e {
      constructor(n, o, i, s, a, u) {
        (this.router = n),
          (this.route = o),
          (this.tabIndexAttribute = i),
          (this.renderer = s),
          (this.el = a),
          (this.locationStrategy = u),
          (this.href = null),
          (this.commands = null),
          (this.onChanges = new oe()),
          (this.preserveFragment = !1),
          (this.skipLocationChange = !1),
          (this.replaceUrl = !1);
        let c = a.nativeElement.tagName?.toLowerCase();
        (this.isAnchorElement = c === "a" || c === "area"),
          this.isAnchorElement
            ? (this.subscription = n.events.subscribe((l) => {
                l instanceof nt && this.updateHref();
              }))
            : this.setTabIndexIfNotOnNativeEl("0");
      }
      setTabIndexIfNotOnNativeEl(n) {
        this.tabIndexAttribute != null ||
          this.isAnchorElement ||
          this.applyAttributeValue("tabindex", n);
      }
      ngOnChanges(n) {
        this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
      }
      set routerLink(n) {
        n != null
          ? ((this.commands = Array.isArray(n) ? n : [n]),
            this.setTabIndexIfNotOnNativeEl("0"))
          : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
      }
      onClick(n, o, i, s, a) {
        let u = this.urlTree;
        if (
          u === null ||
          (this.isAnchorElement &&
            (n !== 0 ||
              o ||
              i ||
              s ||
              a ||
              (typeof this.target == "string" && this.target != "_self")))
        )
          return !0;
        let c = {
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state,
          info: this.info,
        };
        return this.router.navigateByUrl(u, c), !this.isAnchorElement;
      }
      ngOnDestroy() {
        this.subscription?.unsubscribe();
      }
      updateHref() {
        let n = this.urlTree;
        this.href =
          n !== null && this.locationStrategy
            ? this.locationStrategy?.prepareExternalUrl(
                this.router.serializeUrl(n),
              )
            : null;
        let o =
          this.href === null
            ? null
            : Wd(
                this.href,
                this.el.nativeElement.tagName.toLowerCase(),
                "href",
              );
        this.applyAttributeValue("href", o);
      }
      applyAttributeValue(n, o) {
        let i = this.renderer,
          s = this.el.nativeElement;
        o !== null ? i.setAttribute(s, n, o) : i.removeAttribute(s, n);
      }
      get urlTree() {
        return this.commands === null
          ? null
          : this.router.createUrlTree(this.commands, {
              relativeTo:
                this.relativeTo !== void 0 ? this.relativeTo : this.route,
              queryParams: this.queryParams,
              fragment: this.fragment,
              queryParamsHandling: this.queryParamsHandling,
              preserveFragment: this.preserveFragment,
            });
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(x(Fi), x(Wt), Ua("tabindex"), x(ft), x(be), x(Tn));
    }),
      (e.ɵdir = fe({
        type: e,
        selectors: [["", "routerLink", ""]],
        hostVars: 1,
        hostBindings: function (o, i) {
          o & 1 &&
            pt("click", function (a) {
              return i.onClick(
                a.button,
                a.ctrlKey,
                a.shiftKey,
                a.altKey,
                a.metaKey,
              );
            }),
            o & 2 && ii("target", i.target);
        },
        inputs: {
          target: "target",
          queryParams: "queryParams",
          fragment: "fragment",
          queryParamsHandling: "queryParamsHandling",
          state: "state",
          info: "info",
          relativeTo: "relativeTo",
          preserveFragment: [
            ie.HasDecoratorInputTransform,
            "preserveFragment",
            "preserveFragment",
            xn,
          ],
          skipLocationChange: [
            ie.HasDecoratorInputTransform,
            "skipLocationChange",
            "skipLocationChange",
            xn,
          ],
          replaceUrl: [
            ie.HasDecoratorInputTransform,
            "replaceUrl",
            "replaceUrl",
            xn,
          ],
          routerLink: "routerLink",
        },
        standalone: !0,
        features: [su, et],
      }));
    let t = e;
    return t;
  })(),
  $h = (() => {
    let e = class e {
      get isActive() {
        return this._isActive;
      }
      constructor(n, o, i, s, a) {
        (this.router = n),
          (this.element = o),
          (this.renderer = i),
          (this.cdr = s),
          (this.link = a),
          (this.classes = []),
          (this._isActive = !1),
          (this.routerLinkActiveOptions = { exact: !1 }),
          (this.isActiveChange = new X()),
          (this.routerEventsSubscription = n.events.subscribe((u) => {
            u instanceof nt && this.update();
          }));
      }
      ngAfterContentInit() {
        w(this.links.changes, w(null))
          .pipe(sn())
          .subscribe((n) => {
            this.update(), this.subscribeToEachLinkOnChanges();
          });
      }
      subscribeToEachLinkOnChanges() {
        this.linkInputChangesSubscription?.unsubscribe();
        let n = [...this.links.toArray(), this.link]
          .filter((o) => !!o)
          .map((o) => o.onChanges);
        this.linkInputChangesSubscription = G(n)
          .pipe(sn())
          .subscribe((o) => {
            this._isActive !== this.isLinkActive(this.router)(o) &&
              this.update();
          });
      }
      set routerLinkActive(n) {
        let o = Array.isArray(n) ? n : n.split(" ");
        this.classes = o.filter((i) => !!i);
      }
      ngOnChanges(n) {
        this.update();
      }
      ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe(),
          this.linkInputChangesSubscription?.unsubscribe();
      }
      update() {
        !this.links ||
          !this.router.navigated ||
          queueMicrotask(() => {
            let n = this.hasActiveLinks();
            this.classes.forEach((o) => {
              n
                ? this.renderer.addClass(this.element.nativeElement, o)
                : this.renderer.removeClass(this.element.nativeElement, o);
            }),
              n && this.ariaCurrentWhenActive !== void 0
                ? this.renderer.setAttribute(
                    this.element.nativeElement,
                    "aria-current",
                    this.ariaCurrentWhenActive.toString(),
                  )
                : this.renderer.removeAttribute(
                    this.element.nativeElement,
                    "aria-current",
                  ),
              this._isActive !== n &&
                ((this._isActive = n),
                this.cdr.markForCheck(),
                this.isActiveChange.emit(n));
          });
      }
      isLinkActive(n) {
        let o = xE(this.routerLinkActiveOptions)
          ? this.routerLinkActiveOptions
          : this.routerLinkActiveOptions.exact || !1;
        return (i) => {
          let s = i.urlTree;
          return s ? n.isActive(s, o) : !1;
        };
      }
      hasActiveLinks() {
        let n = this.isLinkActive(this.router);
        return (this.link && n(this.link)) || this.links.some(n);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(x(Fi), x(be), x(ft), x(Ut), x(Ni, 8));
    }),
      (e.ɵdir = fe({
        type: e,
        selectors: [["", "routerLinkActive", ""]],
        contentQueries: function (o, i, s) {
          if ((o & 1 && Ff(s, Ni, 5), o & 2)) {
            let a;
            ui((a = ci())) && (i.links = a);
          }
        },
        inputs: {
          routerLinkActiveOptions: "routerLinkActiveOptions",
          ariaCurrentWhenActive: "ariaCurrentWhenActive",
          routerLinkActive: "routerLinkActive",
        },
        outputs: { isActiveChange: "isActiveChange" },
        exportAs: ["routerLinkActive"],
        standalone: !0,
        features: [et],
      }));
    let t = e;
    return t;
  })();
function xE(t) {
  return !!t.paths;
}
var TE = new M("");
function Uh(t, ...e) {
  return qo([
    { provide: ic, multi: !0, useValue: t },
    [],
    { provide: Wt, useFactory: AE, deps: [Fi] },
    { provide: uu, multi: !0, useFactory: NE },
    e.map((r) => r.ɵproviders),
  ]);
}
function AE(t) {
  return t.routerState.root;
}
function NE() {
  let t = g(In);
  return (e) => {
    let r = t.get(hr);
    if (e !== r.components[0]) return;
    let n = t.get(Fi),
      o = t.get(OE);
    t.get(RE) === 1 && n.initialNavigation(),
      t.get(FE, null, S.Optional)?.setUpPreloading(),
      t.get(TE, null, S.Optional)?.init(),
      n.resetRootComponentType(r.componentTypes[0]),
      o.closed || (o.next(), o.complete(), o.unsubscribe());
  };
}
var OE = new M("", { factory: () => new oe() }),
  RE = new M("", { providedIn: "root", factory: () => 1 });
var FE = new M("");
var Bh = (() => {
  let e = class e {};
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-about-us"]],
      standalone: !0,
      features: [Y],
      decls: 27,
      vars: 0,
      consts: [
        [1, "container"],
        [1, "center", "upper"],
        [1, "center"],
        [1, "about-us"],
        [1, "column"],
        [1, "fa-solid", "fa-file-excel", "fa-5x", "big-icon"],
        [1, "fa-solid", "fa-brain", "fa-5x", "big-icon"],
        [1, "fa-solid", "fa-robot", "fa-5x", "big-icon"],
      ],
      template: function (o, i) {
        o & 1 &&
          (v(0, "div", 0)(1, "h3", 1),
          F(2, "Our Expertise"),
          D(),
          v(3, "p", 2),
          F(4, "What exactly are we good at?"),
          D(),
          v(5, "div", 3)(6, "div", 4)(7, "div", 2),
          B(8, "i", 5),
          D(),
          v(9, "h4"),
          F(10, "Excel Automation"),
          D(),
          v(11, "p"),
          F(
            12,
            " We specialize in eliminating extensive Excel usage by automating data flows and moderation. Whether it's creating full web apps or automations within Excel, we tackle even the most complex and unique business processes. ",
          ),
          D()(),
          v(13, "div", 4)(14, "div", 2),
          B(15, "i", 6),
          D(),
          v(16, "h4"),
          F(17, "AI Integration"),
          D(),
          v(18, "p"),
          F(
            19,
            " We integrate LLMs and create custom GPTs that interact with your company data, helping you process long texts such as legal documents and emails. Our solutions enhance your business operations with intelligent automation. ",
          ),
          D()(),
          v(20, "div", 4)(21, "div", 2),
          B(22, "i", 7),
          D(),
          v(23, "h4"),
          F(24, "Custom Software Solutions"),
          D(),
          v(25, "p"),
          F(
            26,
            " We develop fully customized software solutions with a focus on great design and user experience. Our automated apps seamlessly fit into your business processes, ensuring efficiency and ease of use for all your employees. ",
          ),
          D()()()());
      },
      styles: [
        ".container[_ngcontent-%COMP%]{margin-top:128px;margin-bottom:128px}.about-us[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;margin:0}.column[_ngcontent-%COMP%]{text-align:justify;padding:24px}.column[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{text-align:center}.big-icon[_ngcontent-%COMP%]{padding-bottom:16px;color:#64b5f6}.center[_ngcontent-%COMP%]{text-align:center}.upper[_ngcontent-%COMP%]{text-transform:uppercase}",
      ],
    }));
  let t = e;
  return t;
})();
var Kh = (() => {
    let e = class e {
      constructor(n, o) {
        (this._renderer = n),
          (this._elementRef = o),
          (this.onChange = (i) => {}),
          (this.onTouched = () => {});
      }
      setProperty(n, o) {
        this._renderer.setProperty(this._elementRef.nativeElement, n, o);
      }
      registerOnTouched(n) {
        this.onTouched = n;
      }
      registerOnChange(n) {
        this.onChange = n;
      }
      setDisabledState(n) {
        this.setProperty("disabled", n);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(x(ft), x(be));
    }),
      (e.ɵdir = fe({ type: e }));
    let t = e;
    return t;
  })(),
  PE = (() => {
    let e = class e extends Kh {};
    (e.ɵfac = (() => {
      let n;
      return function (i) {
        return (n || (n = cr(e)))(i || e);
      };
    })()),
      (e.ɵdir = fe({ type: e, features: [ht] }));
    let t = e;
    return t;
  })(),
  Jh = new M("");
var kE = { provide: Jh, useExisting: En(() => Hi), multi: !0 };
function LE() {
  let t = tt() ? tt().getUserAgent() : "";
  return /android (\d+)/.test(t.toLowerCase());
}
var VE = new M(""),
  Hi = (() => {
    let e = class e extends Kh {
      constructor(n, o, i) {
        super(n, o),
          (this._compositionMode = i),
          (this._composing = !1),
          this._compositionMode == null && (this._compositionMode = !LE());
      }
      writeValue(n) {
        let o = n ?? "";
        this.setProperty("value", o);
      }
      _handleInput(n) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(n);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(n) {
        (this._composing = !1), this._compositionMode && this.onChange(n);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(x(ft), x(be), x(VE, 8));
    }),
      (e.ɵdir = fe({
        type: e,
        selectors: [
          ["input", "formControlName", "", 3, "type", "checkbox"],
          ["textarea", "formControlName", ""],
          ["input", "formControl", "", 3, "type", "checkbox"],
          ["textarea", "formControl", ""],
          ["input", "ngModel", "", 3, "type", "checkbox"],
          ["textarea", "ngModel", ""],
          ["", "ngDefaultControl", ""],
        ],
        hostBindings: function (o, i) {
          o & 1 &&
            pt("input", function (a) {
              return i._handleInput(a.target.value);
            })("blur", function () {
              return i.onTouched();
            })("compositionstart", function () {
              return i._compositionStart();
            })("compositionend", function (a) {
              return i._compositionEnd(a.target.value);
            });
        },
        features: [li([kE]), ht],
      }));
    let t = e;
    return t;
  })();
function Dt(t) {
  return (
    t == null || ((typeof t == "string" || Array.isArray(t)) && t.length === 0)
  );
}
function Xh(t) {
  return t != null && typeof t.length == "number";
}
var ep = new M(""),
  tp = new M(""),
  jE =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  Ct = class {
    static min(e) {
      return $E(e);
    }
    static max(e) {
      return UE(e);
    }
    static required(e) {
      return BE(e);
    }
    static requiredTrue(e) {
      return HE(e);
    }
    static email(e) {
      return zE(e);
    }
    static minLength(e) {
      return GE(e);
    }
    static maxLength(e) {
      return qE(e);
    }
    static pattern(e) {
      return WE(e);
    }
    static nullValidator(e) {
      return np(e);
    }
    static compose(e) {
      return up(e);
    }
    static composeAsync(e) {
      return lp(e);
    }
  };
function $E(t) {
  return (e) => {
    if (Dt(e.value) || Dt(t)) return null;
    let r = parseFloat(e.value);
    return !isNaN(r) && r < t ? { min: { min: t, actual: e.value } } : null;
  };
}
function UE(t) {
  return (e) => {
    if (Dt(e.value) || Dt(t)) return null;
    let r = parseFloat(e.value);
    return !isNaN(r) && r > t ? { max: { max: t, actual: e.value } } : null;
  };
}
function BE(t) {
  return Dt(t.value) ? { required: !0 } : null;
}
function HE(t) {
  return t.value === !0 ? null : { required: !0 };
}
function zE(t) {
  return Dt(t.value) || jE.test(t.value) ? null : { email: !0 };
}
function GE(t) {
  return (e) =>
    Dt(e.value) || !Xh(e.value)
      ? null
      : e.value.length < t
        ? { minlength: { requiredLength: t, actualLength: e.value.length } }
        : null;
}
function qE(t) {
  return (e) =>
    Xh(e.value) && e.value.length > t
      ? { maxlength: { requiredLength: t, actualLength: e.value.length } }
      : null;
}
function WE(t) {
  if (!t) return np;
  let e, r;
  return (
    typeof t == "string"
      ? ((r = ""),
        t.charAt(0) !== "^" && (r += "^"),
        (r += t),
        t.charAt(t.length - 1) !== "$" && (r += "$"),
        (e = new RegExp(r)))
      : ((r = t.toString()), (e = t)),
    (n) => {
      if (Dt(n.value)) return null;
      let o = n.value;
      return e.test(o)
        ? null
        : { pattern: { requiredPattern: r, actualValue: o } };
    }
  );
}
function np(t) {
  return null;
}
function rp(t) {
  return t != null;
}
function op(t) {
  return $t(t) ? G(t) : t;
}
function ip(t) {
  let e = {};
  return (
    t.forEach((r) => {
      e = r != null ? p(p({}, e), r) : e;
    }),
    Object.keys(e).length === 0 ? null : e
  );
}
function sp(t, e) {
  return e.map((r) => r(t));
}
function ZE(t) {
  return !t.validate;
}
function ap(t) {
  return t.map((e) => (ZE(e) ? e : (r) => e.validate(r)));
}
function up(t) {
  if (!t) return null;
  let e = t.filter(rp);
  return e.length == 0
    ? null
    : function (r) {
        return ip(sp(r, e));
      };
}
function cp(t) {
  return t != null ? up(ap(t)) : null;
}
function lp(t) {
  if (!t) return null;
  let e = t.filter(rp);
  return e.length == 0
    ? null
    : function (r) {
        let n = sp(r, e).map(op);
        return fs(n).pipe(N(ip));
      };
}
function dp(t) {
  return t != null ? lp(ap(t)) : null;
}
function Hh(t, e) {
  return t === null ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
}
function fp(t) {
  return t._rawValidators;
}
function hp(t) {
  return t._rawAsyncValidators;
}
function ac(t) {
  return t ? (Array.isArray(t) ? t : [t]) : [];
}
function Li(t, e) {
  return Array.isArray(t) ? t.includes(e) : t === e;
}
function zh(t, e) {
  let r = ac(e);
  return (
    ac(t).forEach((o) => {
      Li(r, o) || r.push(o);
    }),
    r
  );
}
function Gh(t, e) {
  return ac(e).filter((r) => !Li(t, r));
}
var Vi = class {
    constructor() {
      (this._rawValidators = []),
        (this._rawAsyncValidators = []),
        (this._onDestroyCallbacks = []);
    }
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _setValidators(e) {
      (this._rawValidators = e || []),
        (this._composedValidatorFn = cp(this._rawValidators));
    }
    _setAsyncValidators(e) {
      (this._rawAsyncValidators = e || []),
        (this._composedAsyncValidatorFn = dp(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _registerOnDestroy(e) {
      this._onDestroyCallbacks.push(e);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((e) => e()),
        (this._onDestroyCallbacks = []);
    }
    reset(e = void 0) {
      this.control && this.control.reset(e);
    }
    hasError(e, r) {
      return this.control ? this.control.hasError(e, r) : !1;
    }
    getError(e, r) {
      return this.control ? this.control.getError(e, r) : null;
    }
  },
  jn = class extends Vi {
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  Lr = class extends Vi {
    constructor() {
      super(...arguments),
        (this._parent = null),
        (this.name = null),
        (this.valueAccessor = null);
    }
  },
  ji = class {
    constructor(e) {
      this._cd = e;
    }
    get isTouched() {
      return !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return !!this._cd?.submitted;
    }
  },
  YE = {
    "[class.ng-untouched]": "isUntouched",
    "[class.ng-touched]": "isTouched",
    "[class.ng-pristine]": "isPristine",
    "[class.ng-dirty]": "isDirty",
    "[class.ng-valid]": "isValid",
    "[class.ng-invalid]": "isInvalid",
    "[class.ng-pending]": "isPending",
  },
  KT = $(p({}, YE), { "[class.ng-submitted]": "isSubmitted" }),
  pp = (() => {
    let e = class e extends ji {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(x(Lr, 2));
    }),
      (e.ɵdir = fe({
        type: e,
        selectors: [
          ["", "formControlName", ""],
          ["", "ngModel", ""],
          ["", "formControl", ""],
        ],
        hostVars: 14,
        hostBindings: function (o, i) {
          o & 2 &&
            ai("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
              "ng-pristine",
              i.isPristine,
            )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
              "ng-invalid",
              i.isInvalid,
            )("ng-pending", i.isPending);
        },
        features: [ht],
      }));
    let t = e;
    return t;
  })(),
  gp = (() => {
    let e = class e extends ji {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(x(jn, 10));
    }),
      (e.ɵdir = fe({
        type: e,
        selectors: [
          ["", "formGroupName", ""],
          ["", "formArrayName", ""],
          ["", "ngModelGroup", ""],
          ["", "formGroup", ""],
          ["form", 3, "ngNoForm", ""],
          ["", "ngForm", ""],
        ],
        hostVars: 16,
        hostBindings: function (o, i) {
          o & 2 &&
            ai("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
              "ng-pristine",
              i.isPristine,
            )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
              "ng-invalid",
              i.isInvalid,
            )("ng-pending", i.isPending)("ng-submitted", i.isSubmitted);
        },
        features: [ht],
      }));
    let t = e;
    return t;
  })();
var Pr = "VALID",
  Pi = "INVALID",
  Vn = "PENDING",
  kr = "DISABLED";
function lc(t) {
  return (zi(t) ? t.validators : t) || null;
}
function QE(t) {
  return Array.isArray(t) ? cp(t) : t || null;
}
function dc(t, e) {
  return (zi(e) ? e.asyncValidators : t) || null;
}
function KE(t) {
  return Array.isArray(t) ? dp(t) : t || null;
}
function zi(t) {
  return t != null && !Array.isArray(t) && typeof t == "object";
}
function mp(t, e, r) {
  let n = t.controls;
  if (!(e ? Object.keys(n) : n).length) throw new y(1e3, "");
  if (!n[r]) throw new y(1001, "");
}
function vp(t, e, r) {
  t._forEachChild((n, o) => {
    if (r[o] === void 0) throw new y(1002, "");
  });
}
var $n = class {
    constructor(e, r) {
      (this._pendingDirty = !1),
        (this._hasOwnPendingAsyncValidator = !1),
        (this._pendingTouched = !1),
        (this._onCollectionChange = () => {}),
        (this._parent = null),
        (this.pristine = !0),
        (this.touched = !1),
        (this._onDisabledChange = []),
        this._assignValidators(e),
        this._assignAsyncValidators(r);
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(e) {
      this._rawValidators = this._composedValidatorFn = e;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(e) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
    }
    get parent() {
      return this._parent;
    }
    get valid() {
      return this.status === Pr;
    }
    get invalid() {
      return this.status === Pi;
    }
    get pending() {
      return this.status == Vn;
    }
    get disabled() {
      return this.status === kr;
    }
    get enabled() {
      return this.status !== kr;
    }
    get dirty() {
      return !this.pristine;
    }
    get untouched() {
      return !this.touched;
    }
    get updateOn() {
      return this._updateOn
        ? this._updateOn
        : this.parent
          ? this.parent.updateOn
          : "change";
    }
    setValidators(e) {
      this._assignValidators(e);
    }
    setAsyncValidators(e) {
      this._assignAsyncValidators(e);
    }
    addValidators(e) {
      this.setValidators(zh(e, this._rawValidators));
    }
    addAsyncValidators(e) {
      this.setAsyncValidators(zh(e, this._rawAsyncValidators));
    }
    removeValidators(e) {
      this.setValidators(Gh(e, this._rawValidators));
    }
    removeAsyncValidators(e) {
      this.setAsyncValidators(Gh(e, this._rawAsyncValidators));
    }
    hasValidator(e) {
      return Li(this._rawValidators, e);
    }
    hasAsyncValidator(e) {
      return Li(this._rawAsyncValidators, e);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(e = {}) {
      (this.touched = !0),
        this._parent && !e.onlySelf && this._parent.markAsTouched(e);
    }
    markAllAsTouched() {
      this.markAsTouched({ onlySelf: !0 }),
        this._forEachChild((e) => e.markAllAsTouched());
    }
    markAsUntouched(e = {}) {
      (this.touched = !1),
        (this._pendingTouched = !1),
        this._forEachChild((r) => {
          r.markAsUntouched({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    markAsDirty(e = {}) {
      (this.pristine = !1),
        this._parent && !e.onlySelf && this._parent.markAsDirty(e);
    }
    markAsPristine(e = {}) {
      (this.pristine = !0),
        (this._pendingDirty = !1),
        this._forEachChild((r) => {
          r.markAsPristine({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    markAsPending(e = {}) {
      (this.status = Vn),
        e.emitEvent !== !1 && this.statusChanges.emit(this.status),
        this._parent && !e.onlySelf && this._parent.markAsPending(e);
    }
    disable(e = {}) {
      let r = this._parentMarkedDirty(e.onlySelf);
      (this.status = kr),
        (this.errors = null),
        this._forEachChild((n) => {
          n.disable($(p({}, e), { onlySelf: !0 }));
        }),
        this._updateValue(),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._updateAncestors($(p({}, e), { skipPristineCheck: r })),
        this._onDisabledChange.forEach((n) => n(!0));
    }
    enable(e = {}) {
      let r = this._parentMarkedDirty(e.onlySelf);
      (this.status = Pr),
        this._forEachChild((n) => {
          n.enable($(p({}, e), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent }),
        this._updateAncestors($(p({}, e), { skipPristineCheck: r })),
        this._onDisabledChange.forEach((n) => n(!1));
    }
    _updateAncestors(e) {
      this._parent &&
        !e.onlySelf &&
        (this._parent.updateValueAndValidity(e),
        e.skipPristineCheck || this._parent._updatePristine(),
        this._parent._updateTouched());
    }
    setParent(e) {
      this._parent = e;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(e = {}) {
      this._setInitialStatus(),
        this._updateValue(),
        this.enabled &&
          (this._cancelExistingSubscription(),
          (this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === Pr || this.status === Vn) &&
            this._runAsyncValidator(e.emitEvent)),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e);
    }
    _updateTreeValidity(e = { emitEvent: !0 }) {
      this._forEachChild((r) => r._updateTreeValidity(e)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent });
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? kr : Pr;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(e) {
      if (this.asyncValidator) {
        (this.status = Vn), (this._hasOwnPendingAsyncValidator = !0);
        let r = op(this.asyncValidator(this));
        this._asyncValidationSubscription = r.subscribe((n) => {
          (this._hasOwnPendingAsyncValidator = !1),
            this.setErrors(n, { emitEvent: e });
        });
      }
    }
    _cancelExistingSubscription() {
      this._asyncValidationSubscription &&
        (this._asyncValidationSubscription.unsubscribe(),
        (this._hasOwnPendingAsyncValidator = !1));
    }
    setErrors(e, r = {}) {
      (this.errors = e), this._updateControlsErrors(r.emitEvent !== !1);
    }
    get(e) {
      let r = e;
      return r == null ||
        (Array.isArray(r) || (r = r.split(".")), r.length === 0)
        ? null
        : r.reduce((n, o) => n && n._find(o), this);
    }
    getError(e, r) {
      let n = r ? this.get(r) : this;
      return n && n.errors ? n.errors[e] : null;
    }
    hasError(e, r) {
      return !!this.getError(e, r);
    }
    get root() {
      let e = this;
      for (; e._parent; ) e = e._parent;
      return e;
    }
    _updateControlsErrors(e) {
      (this.status = this._calculateStatus()),
        e && this.statusChanges.emit(this.status),
        this._parent && this._parent._updateControlsErrors(e);
    }
    _initObservables() {
      (this.valueChanges = new X()), (this.statusChanges = new X());
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? kr
        : this.errors
          ? Pi
          : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Vn)
            ? Vn
            : this._anyControlsHaveStatus(Pi)
              ? Pi
              : Pr;
    }
    _anyControlsHaveStatus(e) {
      return this._anyControls((r) => r.status === e);
    }
    _anyControlsDirty() {
      return this._anyControls((e) => e.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((e) => e.touched);
    }
    _updatePristine(e = {}) {
      (this.pristine = !this._anyControlsDirty()),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    _updateTouched(e = {}) {
      (this.touched = this._anyControlsTouched()),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    _registerOnCollectionChange(e) {
      this._onCollectionChange = e;
    }
    _setUpdateStrategy(e) {
      zi(e) && e.updateOn != null && (this._updateOn = e.updateOn);
    }
    _parentMarkedDirty(e) {
      let r = this._parent && this._parent.dirty;
      return !e && !!r && !this._parent._anyControlsDirty();
    }
    _find(e) {
      return null;
    }
    _assignValidators(e) {
      (this._rawValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedValidatorFn = QE(this._rawValidators));
    }
    _assignAsyncValidators(e) {
      (this._rawAsyncValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedAsyncValidatorFn = KE(this._rawAsyncValidators));
    }
  },
  $i = class extends $n {
    constructor(e, r, n) {
      super(lc(r), dc(n, r)),
        (this.controls = e),
        this._initObservables(),
        this._setUpdateStrategy(r),
        this._setUpControls(),
        this.updateValueAndValidity({
          onlySelf: !0,
          emitEvent: !!this.asyncValidator,
        });
    }
    registerControl(e, r) {
      return this.controls[e]
        ? this.controls[e]
        : ((this.controls[e] = r),
          r.setParent(this),
          r._registerOnCollectionChange(this._onCollectionChange),
          r);
    }
    addControl(e, r, n = {}) {
      this.registerControl(e, r),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    removeControl(e, r = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    setControl(e, r, n = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        r && this.registerControl(e, r),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    contains(e) {
      return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
    }
    setValue(e, r = {}) {
      vp(this, !0, e),
        Object.keys(e).forEach((n) => {
          mp(this, !0, n),
            this.controls[n].setValue(e[n], {
              onlySelf: !0,
              emitEvent: r.emitEvent,
            });
        }),
        this.updateValueAndValidity(r);
    }
    patchValue(e, r = {}) {
      e != null &&
        (Object.keys(e).forEach((n) => {
          let o = this.controls[n];
          o && o.patchValue(e[n], { onlySelf: !0, emitEvent: r.emitEvent });
        }),
        this.updateValueAndValidity(r));
    }
    reset(e = {}, r = {}) {
      this._forEachChild((n, o) => {
        n.reset(e ? e[o] : null, { onlySelf: !0, emitEvent: r.emitEvent });
      }),
        this._updatePristine(r),
        this._updateTouched(r),
        this.updateValueAndValidity(r);
    }
    getRawValue() {
      return this._reduceChildren(
        {},
        (e, r, n) => ((e[n] = r.getRawValue()), e),
      );
    }
    _syncPendingControls() {
      let e = this._reduceChildren(!1, (r, n) =>
        n._syncPendingControls() ? !0 : r,
      );
      return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
    }
    _forEachChild(e) {
      Object.keys(this.controls).forEach((r) => {
        let n = this.controls[r];
        n && e(n, r);
      });
    }
    _setUpControls() {
      this._forEachChild((e) => {
        e.setParent(this),
          e._registerOnCollectionChange(this._onCollectionChange);
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(e) {
      for (let [r, n] of Object.entries(this.controls))
        if (this.contains(r) && e(n)) return !0;
      return !1;
    }
    _reduceValue() {
      let e = {};
      return this._reduceChildren(
        e,
        (r, n, o) => ((n.enabled || this.disabled) && (r[o] = n.value), r),
      );
    }
    _reduceChildren(e, r) {
      let n = e;
      return (
        this._forEachChild((o, i) => {
          n = r(n, o, i);
        }),
        n
      );
    }
    _allControlsDisabled() {
      for (let e of Object.keys(this.controls))
        if (this.controls[e].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(e) {
      return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
    }
  };
var uc = class extends $i {};
var yp = new M("CallSetDisabledState", {
    providedIn: "root",
    factory: () => fc,
  }),
  fc = "always";
function JE(t, e) {
  return [...e.path, t];
}
function qh(t, e, r = fc) {
  hc(t, e),
    e.valueAccessor.writeValue(t.value),
    (t.disabled || r === "always") &&
      e.valueAccessor.setDisabledState?.(t.disabled),
    eI(t, e),
    nI(t, e),
    tI(t, e),
    XE(t, e);
}
function Wh(t, e, r = !0) {
  let n = () => {};
  e.valueAccessor &&
    (e.valueAccessor.registerOnChange(n), e.valueAccessor.registerOnTouched(n)),
    Bi(t, e),
    t &&
      (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}));
}
function Ui(t, e) {
  t.forEach((r) => {
    r.registerOnValidatorChange && r.registerOnValidatorChange(e);
  });
}
function XE(t, e) {
  if (e.valueAccessor.setDisabledState) {
    let r = (n) => {
      e.valueAccessor.setDisabledState(n);
    };
    t.registerOnDisabledChange(r),
      e._registerOnDestroy(() => {
        t._unregisterOnDisabledChange(r);
      });
  }
}
function hc(t, e) {
  let r = fp(t);
  e.validator !== null
    ? t.setValidators(Hh(r, e.validator))
    : typeof r == "function" && t.setValidators([r]);
  let n = hp(t);
  e.asyncValidator !== null
    ? t.setAsyncValidators(Hh(n, e.asyncValidator))
    : typeof n == "function" && t.setAsyncValidators([n]);
  let o = () => t.updateValueAndValidity();
  Ui(e._rawValidators, o), Ui(e._rawAsyncValidators, o);
}
function Bi(t, e) {
  let r = !1;
  if (t !== null) {
    if (e.validator !== null) {
      let o = fp(t);
      if (Array.isArray(o) && o.length > 0) {
        let i = o.filter((s) => s !== e.validator);
        i.length !== o.length && ((r = !0), t.setValidators(i));
      }
    }
    if (e.asyncValidator !== null) {
      let o = hp(t);
      if (Array.isArray(o) && o.length > 0) {
        let i = o.filter((s) => s !== e.asyncValidator);
        i.length !== o.length && ((r = !0), t.setAsyncValidators(i));
      }
    }
  }
  let n = () => {};
  return Ui(e._rawValidators, n), Ui(e._rawAsyncValidators, n), r;
}
function eI(t, e) {
  e.valueAccessor.registerOnChange((r) => {
    (t._pendingValue = r),
      (t._pendingChange = !0),
      (t._pendingDirty = !0),
      t.updateOn === "change" && Dp(t, e);
  });
}
function tI(t, e) {
  e.valueAccessor.registerOnTouched(() => {
    (t._pendingTouched = !0),
      t.updateOn === "blur" && t._pendingChange && Dp(t, e),
      t.updateOn !== "submit" && t.markAsTouched();
  });
}
function Dp(t, e) {
  t._pendingDirty && t.markAsDirty(),
    t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
    e.viewToModelUpdate(t._pendingValue),
    (t._pendingChange = !1);
}
function nI(t, e) {
  let r = (n, o) => {
    e.valueAccessor.writeValue(n), o && e.viewToModelUpdate(n);
  };
  t.registerOnChange(r),
    e._registerOnDestroy(() => {
      t._unregisterOnChange(r);
    });
}
function rI(t, e) {
  t == null, hc(t, e);
}
function oI(t, e) {
  return Bi(t, e);
}
function iI(t, e) {
  if (!t.hasOwnProperty("model")) return !1;
  let r = t.model;
  return r.isFirstChange() ? !0 : !Object.is(e, r.currentValue);
}
function sI(t) {
  return Object.getPrototypeOf(t.constructor) === PE;
}
function aI(t, e) {
  t._syncPendingControls(),
    e.forEach((r) => {
      let n = r.control;
      n.updateOn === "submit" &&
        n._pendingChange &&
        (r.viewToModelUpdate(n._pendingValue), (n._pendingChange = !1));
    });
}
function uI(t, e) {
  if (!e) return null;
  Array.isArray(e);
  let r, n, o;
  return (
    e.forEach((i) => {
      i.constructor === Hi ? (r = i) : sI(i) ? (n = i) : (o = i);
    }),
    o || n || r || null
  );
}
function cI(t, e) {
  let r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}
function Zh(t, e) {
  let r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}
function Yh(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    Object.keys(t).length === 2 &&
    "value" in t &&
    "disabled" in t
  );
}
var ki = class extends $n {
  constructor(e = null, r, n) {
    super(lc(r), dc(n, r)),
      (this.defaultValue = null),
      (this._onChange = []),
      (this._pendingChange = !1),
      this._applyFormState(e),
      this._setUpdateStrategy(r),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      zi(r) &&
        (r.nonNullable || r.initialValueIsDefault) &&
        (Yh(e) ? (this.defaultValue = e.value) : (this.defaultValue = e));
  }
  setValue(e, r = {}) {
    (this.value = this._pendingValue = e),
      this._onChange.length &&
        r.emitModelToViewChange !== !1 &&
        this._onChange.forEach((n) =>
          n(this.value, r.emitViewToModelChange !== !1),
        ),
      this.updateValueAndValidity(r);
  }
  patchValue(e, r = {}) {
    this.setValue(e, r);
  }
  reset(e = this.defaultValue, r = {}) {
    this._applyFormState(e),
      this.markAsPristine(r),
      this.markAsUntouched(r),
      this.setValue(this.value, r),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(e) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(e) {
    this._onChange.push(e);
  }
  _unregisterOnChange(e) {
    Zh(this._onChange, e);
  }
  registerOnDisabledChange(e) {
    this._onDisabledChange.push(e);
  }
  _unregisterOnDisabledChange(e) {
    Zh(this._onDisabledChange, e);
  }
  _forEachChild(e) {}
  _syncPendingControls() {
    return this.updateOn === "submit" &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(e) {
    Yh(e)
      ? ((this.value = this._pendingValue = e.value),
        e.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = e);
  }
};
var lI = (t) => t instanceof ki;
var Cp = (() => {
  let e = class e {};
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵdir = fe({
      type: e,
      selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
      hostAttrs: ["novalidate", ""],
    }));
  let t = e;
  return t;
})();
var wp = new M("");
var dI = { provide: jn, useExisting: En(() => pc) },
  pc = (() => {
    let e = class e extends jn {
      constructor(n, o, i) {
        super(),
          (this.callSetDisabledState = i),
          (this.submitted = !1),
          (this._onCollectionChange = () => this._updateDomValue()),
          (this.directives = []),
          (this.form = null),
          (this.ngSubmit = new X()),
          this._setValidators(n),
          this._setAsyncValidators(o);
      }
      ngOnChanges(n) {
        this._checkFormPresent(),
          n.hasOwnProperty("form") &&
            (this._updateValidators(),
            this._updateDomValue(),
            this._updateRegistrations(),
            (this._oldForm = this.form));
      }
      ngOnDestroy() {
        this.form &&
          (Bi(this.form, this),
          this.form._onCollectionChange === this._onCollectionChange &&
            this.form._registerOnCollectionChange(() => {}));
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      addControl(n) {
        let o = this.form.get(n.path);
        return (
          qh(o, n, this.callSetDisabledState),
          o.updateValueAndValidity({ emitEvent: !1 }),
          this.directives.push(n),
          o
        );
      }
      getControl(n) {
        return this.form.get(n.path);
      }
      removeControl(n) {
        Wh(n.control || null, n, !1), cI(this.directives, n);
      }
      addFormGroup(n) {
        this._setUpFormContainer(n);
      }
      removeFormGroup(n) {
        this._cleanUpFormContainer(n);
      }
      getFormGroup(n) {
        return this.form.get(n.path);
      }
      addFormArray(n) {
        this._setUpFormContainer(n);
      }
      removeFormArray(n) {
        this._cleanUpFormContainer(n);
      }
      getFormArray(n) {
        return this.form.get(n.path);
      }
      updateModel(n, o) {
        this.form.get(n.path).setValue(o);
      }
      onSubmit(n) {
        return (
          (this.submitted = !0),
          aI(this.form, this.directives),
          this.ngSubmit.emit(n),
          n?.target?.method === "dialog"
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(n = void 0) {
        this.form.reset(n), (this.submitted = !1);
      }
      _updateDomValue() {
        this.directives.forEach((n) => {
          let o = n.control,
            i = this.form.get(n.path);
          o !== i &&
            (Wh(o || null, n),
            lI(i) && (qh(i, n, this.callSetDisabledState), (n.control = i)));
        }),
          this.form._updateTreeValidity({ emitEvent: !1 });
      }
      _setUpFormContainer(n) {
        let o = this.form.get(n.path);
        rI(o, n), o.updateValueAndValidity({ emitEvent: !1 });
      }
      _cleanUpFormContainer(n) {
        if (this.form) {
          let o = this.form.get(n.path);
          o && oI(o, n) && o.updateValueAndValidity({ emitEvent: !1 });
        }
      }
      _updateRegistrations() {
        this.form._registerOnCollectionChange(this._onCollectionChange),
          this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
      }
      _updateValidators() {
        hc(this.form, this), this._oldForm && Bi(this._oldForm, this);
      }
      _checkFormPresent() {
        this.form;
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)(x(ep, 10), x(tp, 10), x(yp, 8));
    }),
      (e.ɵdir = fe({
        type: e,
        selectors: [["", "formGroup", ""]],
        hostBindings: function (o, i) {
          o & 1 &&
            pt("submit", function (a) {
              return i.onSubmit(a);
            })("reset", function () {
              return i.onReset();
            });
        },
        inputs: { form: [ie.None, "formGroup", "form"] },
        outputs: { ngSubmit: "ngSubmit" },
        exportAs: ["ngForm"],
        features: [li([dI]), ht, et],
      }));
    let t = e;
    return t;
  })();
var fI = { provide: Lr, useExisting: En(() => gc) },
  gc = (() => {
    let e = class e extends Lr {
      set isDisabled(n) {}
      constructor(n, o, i, s, a) {
        super(),
          (this._ngModelWarningConfig = a),
          (this._added = !1),
          (this.name = null),
          (this.update = new X()),
          (this._ngModelWarningSent = !1),
          (this._parent = n),
          this._setValidators(o),
          this._setAsyncValidators(i),
          (this.valueAccessor = uI(this, s));
      }
      ngOnChanges(n) {
        this._added || this._setUpControl(),
          iI(n, this.viewModel) &&
            ((this.viewModel = this.model),
            this.formDirective.updateModel(this, this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      viewToModelUpdate(n) {
        (this.viewModel = n), this.update.emit(n);
      }
      get path() {
        return JE(
          this.name == null ? this.name : this.name.toString(),
          this._parent,
        );
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      _checkParentType() {}
      _setUpControl() {
        this._checkParentType(),
          (this.control = this.formDirective.addControl(this)),
          (this._added = !0);
      }
    };
    (e._ngModelWarningSentOnce = !1),
      (e.ɵfac = function (o) {
        return new (o || e)(
          x(jn, 13),
          x(ep, 10),
          x(tp, 10),
          x(Jh, 10),
          x(wp, 8),
        );
      }),
      (e.ɵdir = fe({
        type: e,
        selectors: [["", "formControlName", ""]],
        inputs: {
          name: [ie.None, "formControlName", "name"],
          isDisabled: [ie.None, "disabled", "isDisabled"],
          model: [ie.None, "ngModel", "model"],
        },
        outputs: { update: "ngModelChange" },
        features: [li([fI]), ht, et],
      }));
    let t = e;
    return t;
  })();
var hI = (() => {
    let e = class e {};
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵmod = Lt({ type: e })),
      (e.ɵinj = kt({}));
    let t = e;
    return t;
  })(),
  cc = class extends $n {
    constructor(e, r, n) {
      super(lc(r), dc(n, r)),
        (this.controls = e),
        this._initObservables(),
        this._setUpdateStrategy(r),
        this._setUpControls(),
        this.updateValueAndValidity({
          onlySelf: !0,
          emitEvent: !!this.asyncValidator,
        });
    }
    at(e) {
      return this.controls[this._adjustIndex(e)];
    }
    push(e, r = {}) {
      this.controls.push(e),
        this._registerControl(e),
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    insert(e, r, n = {}) {
      this.controls.splice(e, 0, r),
        this._registerControl(r),
        this.updateValueAndValidity({ emitEvent: n.emitEvent });
    }
    removeAt(e, r = {}) {
      let n = this._adjustIndex(e);
      n < 0 && (n = 0),
        this.controls[n] &&
          this.controls[n]._registerOnCollectionChange(() => {}),
        this.controls.splice(n, 1),
        this.updateValueAndValidity({ emitEvent: r.emitEvent });
    }
    setControl(e, r, n = {}) {
      let o = this._adjustIndex(e);
      o < 0 && (o = 0),
        this.controls[o] &&
          this.controls[o]._registerOnCollectionChange(() => {}),
        this.controls.splice(o, 1),
        r && (this.controls.splice(o, 0, r), this._registerControl(r)),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    get length() {
      return this.controls.length;
    }
    setValue(e, r = {}) {
      vp(this, !1, e),
        e.forEach((n, o) => {
          mp(this, !1, o),
            this.at(o).setValue(n, { onlySelf: !0, emitEvent: r.emitEvent });
        }),
        this.updateValueAndValidity(r);
    }
    patchValue(e, r = {}) {
      e != null &&
        (e.forEach((n, o) => {
          this.at(o) &&
            this.at(o).patchValue(n, { onlySelf: !0, emitEvent: r.emitEvent });
        }),
        this.updateValueAndValidity(r));
    }
    reset(e = [], r = {}) {
      this._forEachChild((n, o) => {
        n.reset(e[o], { onlySelf: !0, emitEvent: r.emitEvent });
      }),
        this._updatePristine(r),
        this._updateTouched(r),
        this.updateValueAndValidity(r);
    }
    getRawValue() {
      return this.controls.map((e) => e.getRawValue());
    }
    clear(e = {}) {
      this.controls.length < 1 ||
        (this._forEachChild((r) => r._registerOnCollectionChange(() => {})),
        this.controls.splice(0),
        this.updateValueAndValidity({ emitEvent: e.emitEvent }));
    }
    _adjustIndex(e) {
      return e < 0 ? e + this.length : e;
    }
    _syncPendingControls() {
      let e = this.controls.reduce(
        (r, n) => (n._syncPendingControls() ? !0 : r),
        !1,
      );
      return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
    }
    _forEachChild(e) {
      this.controls.forEach((r, n) => {
        e(r, n);
      });
    }
    _updateValue() {
      this.value = this.controls
        .filter((e) => e.enabled || this.disabled)
        .map((e) => e.value);
    }
    _anyControls(e) {
      return this.controls.some((r) => r.enabled && e(r));
    }
    _setUpControls() {
      this._forEachChild((e) => this._registerControl(e));
    }
    _allControlsDisabled() {
      for (let e of this.controls) if (e.enabled) return !1;
      return this.controls.length > 0 || this.disabled;
    }
    _registerControl(e) {
      e.setParent(this),
        e._registerOnCollectionChange(this._onCollectionChange);
    }
    _find(e) {
      return this.at(e) ?? null;
    }
  };
function Qh(t) {
  return (
    !!t &&
    (t.asyncValidators !== void 0 ||
      t.validators !== void 0 ||
      t.updateOn !== void 0)
  );
}
var Ep = (() => {
  let e = class e {
    constructor() {
      this.useNonNullable = !1;
    }
    get nonNullable() {
      let n = new e();
      return (n.useNonNullable = !0), n;
    }
    group(n, o = null) {
      let i = this._reduceControls(n),
        s = {};
      return (
        Qh(o)
          ? (s = o)
          : o !== null &&
            ((s.validators = o.validator),
            (s.asyncValidators = o.asyncValidator)),
        new $i(i, s)
      );
    }
    record(n, o = null) {
      let i = this._reduceControls(n);
      return new uc(i, o);
    }
    control(n, o, i) {
      let s = {};
      return this.useNonNullable
        ? (Qh(o) ? (s = o) : ((s.validators = o), (s.asyncValidators = i)),
          new ki(n, $(p({}, s), { nonNullable: !0 })))
        : new ki(n, o, i);
    }
    array(n, o, i) {
      let s = n.map((a) => this._createControl(a));
      return new cc(s, o, i);
    }
    _reduceControls(n) {
      let o = {};
      return (
        Object.keys(n).forEach((i) => {
          o[i] = this._createControl(n[i]);
        }),
        o
      );
    }
    _createControl(n) {
      if (n instanceof ki) return n;
      if (n instanceof $n) return n;
      if (Array.isArray(n)) {
        let o = n[0],
          i = n.length > 1 ? n[1] : null,
          s = n.length > 2 ? n[2] : null;
        return this.control(o, i, s);
      } else return this.control(n);
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var Gi = (() => {
  let e = class e {
    static withConfig(n) {
      return {
        ngModule: e,
        providers: [
          { provide: wp, useValue: n.warnOnNgModelWithFormControl ?? "always" },
          { provide: yp, useValue: n.callSetDisabledState ?? fc },
        ],
      };
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵmod = Lt({ type: e })),
    (e.ɵinj = kt({ imports: [hI] }));
  let t = e;
  return t;
})();
var qi = (() => {
  let e = class e {};
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-contact-info"]],
      standalone: !0,
      features: [Y],
      decls: 13,
      vars: 0,
      consts: [
        [1, "contact-info"],
        [1, "row"],
        [1, "fa", "fa-map-marker", "fa-2x"],
        [1, "fa", "fa-phone", "fa-2x"],
        [1, "fa", "fa-envelope", "fa-2x"],
      ],
      template: function (o, i) {
        o & 1 &&
          (v(0, "div", 0)(1, "div", 1),
          B(2, "i", 2),
          v(3, "p"),
          F(4, "Headquarters: Aleje Jerozolimskie 134 02-305, Warsaw, Poland"),
          D()(),
          v(5, "div", 1),
          B(6, "i", 3),
          v(7, "p"),
          F(8, "Phone: +48 667 447 776"),
          D()(),
          v(9, "div", 1),
          B(10, "i", 4),
          v(11, "p"),
          F(12, "Email: contact@ardium.pl"),
          D()()());
      },
      styles: [
        ".contact-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;margin:0 auto}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;text-align:left;margin:0 1em}.row[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{width:2em;text-align:center}.row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:1em}",
      ],
    }));
  let t = e;
  return t;
})();
function gI(t, e) {
  t & 1 && (v(0, "small"), F(1, "Name is required"), D());
}
function mI(t, e) {
  t & 1 && (v(0, "small"), F(1, "Make sure that your email is valid"), D());
}
function vI(t, e) {
  t & 1 && (v(0, "small"), F(1, "Subject is required"), D());
}
function yI(t, e) {
  t & 1 && (v(0, "small"), F(1, "Message is required"), D());
}
var Wi = (() => {
  let e = class e {
    constructor(n, o) {
      (this.titleService = n),
        (this.formBuilder = o),
        this.titleService.setTitle("Ardium - Contact"),
        (this.contactForm = this.formBuilder.group({
          name: ["", Ct.required],
          email: ["", [Ct.required, Ct.email]],
          subject: ["", Ct.required],
          message: ["", Ct.required],
        }));
    }
    get name() {
      return this.contactForm.get("name");
    }
    get emailControl() {
      return this.contactForm.get("email");
    }
    get subject() {
      return this.contactForm.get("subject");
    }
    get message() {
      return this.contactForm.get("message");
    }
    onSubmit() {
      this.contactForm.valid
        ? console.log(this.contactForm.value)
        : console.log("Formularz jest niepoprawny");
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)(x(gt), x(Ep));
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-contact"]],
      standalone: !0,
      features: [Y],
      decls: 26,
      vars: 6,
      consts: [
        [1, "contact-us"],
        [1, "header"],
        [1, "container-1"],
        [1, "forms"],
        [3, "ngSubmit", "formGroup"],
        [
          "type",
          "text",
          "placeholder",
          "Name",
          "formControlName",
          "name",
          1,
          "w3-input",
          "w3-border",
          "box",
        ],
        [
          "type",
          "email",
          "placeholder",
          "Email",
          "formControlName",
          "email",
          1,
          "w3-input",
          "w3-border",
          "box",
        ],
        [
          "type",
          "text",
          "placeholder",
          "Subject",
          "formControlName",
          "subject",
          1,
          "w3-input",
          "w3-border",
          "box",
        ],
        [
          "type",
          "text",
          "placeholder",
          "Message",
          "formControlName",
          "message",
          1,
          "w3-input",
          "w3-border",
          "box",
        ],
        [1, "container-2"],
        ["type", "submit", 1, "button", 3, "disabled"],
        [1, "fa", "fa-paper-plane"],
      ],
      template: function (o, i) {
        o & 1 &&
          (v(0, "div", 0)(1, "div", 1)(2, "h3"),
          F(3, "Contact"),
          D(),
          v(4, "p"),
          F(5, "Send us a message"),
          D()(),
          v(6, "div", 2),
          B(7, "app-contact-info"),
          v(8, "div", 3)(9, "form", 4),
          pt("ngSubmit", function () {
            return i.onSubmit();
          }),
          v(10, "p"),
          B(11, "input", 5),
          Sn(12, gI, 2, 0, "small"),
          D(),
          v(13, "p"),
          B(14, "input", 6),
          Sn(15, mI, 2, 0, "small"),
          D(),
          v(16, "p"),
          B(17, "input", 7),
          Sn(18, vI, 2, 0, "small"),
          D(),
          v(19, "p"),
          B(20, "input", 8),
          Sn(21, yI, 2, 0, "small"),
          D(),
          v(22, "div", 9)(23, "button", 10),
          B(24, "i", 11),
          F(25, " Send message "),
          D()()()()()()),
          o & 2 &&
            (jt(9),
            si("formGroup", i.contactForm),
            jt(3),
            fr(
              12,
              i.name != null &&
                i.name.invalid &&
                i.name != null &&
                i.name.touched
                ? 12
                : -1,
            ),
            jt(3),
            fr(
              15,
              i.emailControl != null &&
                i.emailControl.invalid &&
                i.emailControl != null &&
                i.emailControl.touched
                ? 15
                : -1,
            ),
            jt(3),
            fr(
              18,
              i.subject != null &&
                i.subject.invalid &&
                i.subject != null &&
                i.subject.touched
                ? 18
                : -1,
            ),
            jt(3),
            fr(
              21,
              i.message != null &&
                i.message.invalid &&
                i.message != null &&
                i.message.touched
                ? 21
                : -1,
            ),
            jt(2),
            si("disabled", i.contactForm.invalid));
      },
      dependencies: [Gi, Cp, Hi, pp, gp, pc, gc, Ht, qi],
      styles: [
        ".contact-us[_ngcontent-%COMP%]{padding:30px 0}.header[_ngcontent-%COMP%]{text-align:center;margin:30px 0}.header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-transform:uppercase}.header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px}.container-1[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;width:70%;margin:30px auto;background-color:#f1f1f1}app-contact-info[_ngcontent-%COMP%]{height:100%;margin:auto}.forms[_ngcontent-%COMP%]{padding:30px;margin:0 auto;width:600px;background-color:#f1f1f1}.box[_ngcontent-%COMP%]{width:100%}.button[_ngcontent-%COMP%]{background-color:#64b5f6;color:#fff;padding:8px 16px;border:none;text-transform:uppercase}.button[_ngcontent-%COMP%]:hover{background:#2196f3}.container-2[_ngcontent-%COMP%]{width:205px;margin:auto}",
      ],
    }));
  let t = e;
  return t;
})();
var DI = ["descriptionContainer"],
  Ip = (() => {
    let e = class e {
      constructor() {
        (this.hoveredIndex = iu(0)),
          (this.lastHoveredIndex = iu(1)),
          (this.description = Hf(() => {
            let n = document.querySelectorAll(".trust-us-item .description");
            return this.hoveredIndex() > 0
              ? n[this.hoveredIndex() - 1]?.textContent || ""
              : this.lastHoveredIndex() > 0
                ? n[this.lastHoveredIndex() - 1]?.textContent || ""
                : "Najed\u017A na logo, aby zobaczy\u0107 opis";
          }));
      }
      setHoveredIndex(n) {
        n > 0 && this.lastHoveredIndex.set(n), this.hoveredIndex.set(n);
      }
      getIconClass(n) {
        return this.hoveredIndex() === n ||
          (this.hoveredIndex() === 0 && this.lastHoveredIndex() === n) ||
          (this.hoveredIndex() === 0 &&
            this.lastHoveredIndex() === 1 &&
            n === 1)
          ? "big-icon"
          : "";
      }
    };
    (e.ɵfac = function (o) {
      return new (o || e)();
    }),
      (e.ɵcmp = Z({
        type: e,
        selectors: [["app-trust-us"]],
        viewQuery: function (o, i) {
          if ((o & 1 && Pf(DI, 7), o & 2)) {
            let s;
            ui((s = ci())) && (i.descriptionContainer = s.first);
          }
        },
        standalone: !0,
        features: [Y],
        decls: 0,
        vars: 0,
        template: function (o, i) {},
        dependencies: [Ht],
        styles: [
          '@charset "UTF-8";body[_ngcontent-%COMP%]{font-family:Arial,sans-serif;margin:0;padding:60px 0 0;box-sizing:border-box}h3[_ngcontent-%COMP%]{text-transform:uppercase;margin-bottom:60px}.trust-us-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;background-color:#fff}.trust-us-container[_ngcontent-%COMP%]{display:flex;justify-content:center;width:100%;max-width:1200px;margin-bottom:60px}.trust-us-item[_ngcontent-%COMP%]{text-align:center;padding:0 40px;height:120px}img[_ngcontent-%COMP%]{width:100px;height:100px;transition:width .3s ease-in-out,height .3s ease-in-out}.big-icon[_ngcontent-%COMP%]{width:120px;height:120px}.description[_ngcontent-%COMP%]{display:none}.central-description[_ngcontent-%COMP%]{width:600px;height:150px;text-align:center;font-size:1.2em;color:#333}',
        ],
      }));
    let t = e;
    return t;
  })();
var bp = (() => {
  let e = class e {
    constructor(n) {
      (this.titleService = n), this.titleService.setTitle("Ardium - Home");
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)(x(gt));
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-home"]],
      standalone: !0,
      features: [Y],
      decls: 14,
      vars: 0,
      consts: [
        [1, "call_to_action"],
        [1, "call1"],
        [1, "call2"],
        [1, "section"],
        [1, "motivation"],
      ],
      template: function (o, i) {
        o & 1 &&
          (v(0, "header")(1, "div", 0)(2, "h1", 1),
          F(3, "Empowering Business Growth through Automation Solutions"),
          D(),
          v(4, "p", 2),
          F(
            5,
            "At Ardium, we create fully custom software tailored to your needs, with a focus on exceptional design and comprehensive employee training. ",
          ),
          D()()(),
          B(6, "app-about-us")(7, "app-trust-us")(8, "app-contact", 3),
          v(9, "div", 4)(10, "h1"),
          F(11, "Our Motivation"),
          D(),
          v(12, "p"),
          F(
            13,
            " At Ardium we empower businesses to achieve new heights through custom automation solutions. We are passionate about delivering software that is both robust and beautifully designed, tailored to meet the unique needs of each client. Our team excels in handling technically demanding projects, free from the constraints of low-code tools. We prioritize comprehensive employee training to ensure seamless integration and effective use of our software. Our commitment is to drive growth and innovation, helping businesses unlock their full potential through technology. ",
          ),
          D()());
      },
      dependencies: [Wi, Ip, Bh],
      styles: [
        "header[_ngcontent-%COMP%]{display:flex;background-position:center;background-size:cover;background-image:url(/assets/bgimg_isometric.jpg);min-height:800px}.call_to_action[_ngcontent-%COMP%]{margin:11% 2% auto;color:#fff}.call1[_ngcontent-%COMP%]{font-size:30px}.call2[_ngcontent-%COMP%]{font-size:20px}.columns[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;margin:0}.column[_ngcontent-%COMP%]{text-align:justify;padding:24px}.column[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .comment[_ngcontent-%COMP%]{text-align:center}.container[_ngcontent-%COMP%]{margin-top:128px;margin-bottom:128px}.center[_ngcontent-%COMP%]{text-align:center}.upper[_ngcontent-%COMP%]{text-transform:uppercase}.big-icon[_ngcontent-%COMP%]{padding-bottom:16px;color:#64b5f6}.section[_ngcontent-%COMP%]{margin:128px 0}.motivation[_ngcontent-%COMP%]{background-position:top;background-size:cover;background-image:url(/assets/bgimg_warsaw.jpg);min-height:800px}.motivation[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:60px 0;margin:0;text-align:center}.motivation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:800px;margin:0 auto;text-align:justify}",
      ],
    }));
  let t = e;
  return t;
})();
var Mp = (() => {
  let e = class e {
    constructor(n) {
      (this.titleService = n), this.titleService.setTitle("Ardium - Products");
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)(x(gt));
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-products"]],
      standalone: !0,
      features: [Y],
      decls: 5,
      vars: 0,
      consts: [
        [1, "container"],
        [1, "w3-center", "upper"],
        [1, "w3-center", "w3-large"],
      ],
      template: function (o, i) {
        o & 1 &&
          (v(0, "div", 0)(1, "h3", 1),
          F(2, "nasze projekty"),
          D(),
          v(3, "p", 2),
          F(4, "Projekty kt\xF3re zrobili\u015Bmy"),
          D()());
      },
      styles: [
        ".container[_ngcontent-%COMP%]{padding:128px 16px;margin:200px 0}.upper[_ngcontent-%COMP%]{text-transform:uppercase}",
      ],
    }));
  let t = e;
  return t;
})();
var _p = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: bp },
  { path: "products", component: Mp },
  { path: "contact", component: Wi },
  { path: "**", redirectTo: "/home" },
];
var Sp = { providers: [Uh(_p)] };
var xp = (() => {
  let e = class e {};
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-header"]],
      standalone: !0,
      features: [Y],
      decls: 14,
      vars: 0,
      consts: [
        [1, "brand"],
        [1, "brand-item"],
        ["src", "assets/logo_alone.png", "alt", "logo", 1, "logo"],
        ["src", "assets/name.png", "alt", "name", 1, "name"],
        [1, "navigation"],
        ["routerLink", "/home", "routerLinkActive", "active"],
        ["routerLink", "/contact", "routerLinkActive", "active"],
      ],
      template: function (o, i) {
        o & 1 &&
          (v(0, "header")(1, "ul", 0)(2, "li", 1),
          B(3, "img", 2),
          D(),
          v(4, "li", 1),
          B(5, "img", 3),
          D()(),
          v(6, "nav")(7, "ul", 4)(8, "li")(9, "a", 5),
          F(10, "Home"),
          D()(),
          v(11, "li")(12, "a", 6),
          F(13, "Contact"),
          D()()()()());
      },
      dependencies: [Ni, $h],
      styles: [
        '@charset "UTF-8";header[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;height:60px;position:fixed;top:0;left:0;width:100%;background:#fff;z-index:1000;box-shadow:0 2px 4px #0000001a}.brand[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;list-style:none;padding:0;margin:0}.brand-item[_ngcontent-%COMP%]{height:100%;display:flex;align-items:center}.logo[_ngcontent-%COMP%]{margin:0 16px;height:80%}.name[_ngcontent-%COMP%]{height:60%}nav[_ngcontent-%COMP%]{display:flex;align-items:center}.navigation[_ngcontent-%COMP%]{display:flex;flex-direction:row;margin:0;list-style:none;height:100%}.navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{height:100%;padding:0 16px;text-decoration:none;display:flex;align-items:center}.navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:#d3d3d3}body[_ngcontent-%COMP%]{margin:0;padding-top:60px}',
      ],
    }));
  let t = e;
  return t;
})();
var Tp = (() => {
  let e = class e {};
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-footer"]],
      standalone: !0,
      features: [Y],
      decls: 4,
      vars: 0,
      consts: [
        [1, "footer"],
        [1, "center"],
      ],
      template: function (o, i) {
        o & 1 &&
          (v(0, "footer", 0)(1, "h3", 1),
          F(2, "Reach out!"),
          D(),
          B(3, "app-contact-info"),
          D());
      },
      dependencies: [qi],
      styles: [
        ".footer[_ngcontent-%COMP%]{height:100%;background-color:#64b5f6;margin:0;display:block;padding:24px 0}.footer[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0}app-contact-info[_ngcontent-%COMP%]{font-size:12px}.center[_ngcontent-%COMP%]{text-align:center;text-transform:uppercase}",
      ],
    }));
  let t = e;
  return t;
})();
var Ap = (() => {
  let e = class e {
    constructor() {
      this.title = "Homepage";
    }
  };
  (e.ɵfac = function (o) {
    return new (o || e)();
  }),
    (e.ɵcmp = Z({
      type: e,
      selectors: [["app-root"]],
      standalone: !0,
      features: [Y],
      decls: 4,
      vars: 0,
      consts: [[1, "home-page"]],
      template: function (o, i) {
        o & 1 &&
          (v(0, "div", 0),
          B(1, "app-header")(2, "router-outlet")(3, "app-footer"),
          D());
      },
      dependencies: [Ht, ec, xp, Tp, Gi],
      styles: [
        ".home-page[_ngcontent-%COMP%]{line-height:1.8;height:100%;font-family:Raleway,sans-serif}app-header[_ngcontent-%COMP%]{position:fixed;width:100%;top:0;background-color:#fff}router-outlet[_ngcontent-%COMP%]{margin-top:60px}",
      ],
    }));
  let t = e;
  return t;
})();
sh(Ap, Sp).catch((t) => console.error(t));
