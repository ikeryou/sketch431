import { Color, Vector3 } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { MousePointer } from "../core/mousePointer";
import { Func } from "../core/func";
import { HSL } from "../libs/hsl";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _key: number
  private _dist: number = 0
  private _rot: Vector3 = new Vector3()

  constructor(opt:any) {
    super(opt)

    this._c = Util.randomInt(0, 1000)

    this._key = opt.key
    this.addClass('material-symbols-outlined')

    this._changeIcon()

    this.useGPU(this.el)
  }

  private _makeShadow(ang: number, color: string, interval: number):string {
    let radius = 0;
    const num = Func.val(50, 100);

    let res = '';
    for(var i = 0; i <= num; i++) {
      let rad = Util.radian(ang)
      let x = ~~(Math.sin(rad * 1) * radius);
      let y = ~~(Math.cos(rad * 1) * radius);
      res += x + 'px ' + y + 'px 0px ' + color;
      if(i != num) {
        res += ', ';
      }
      radius += interval;
    }

    return res;
  }

  private _changeIcon():void {
    this.el.innerHTML = 'rocket_launch'
  }

  protected _update():void {
    super._update();

    // if(this._c % 60 === 0) this._changeIcon()

    const sw = Func.sw()
    const sh = Func.sh()

    const mx = MousePointer.instance.easeNormal.x
    const my = MousePointer.instance.easeNormal.y



    const maxDist = Math.max(sw, sh) * 0.05

    const fontSize = Func.val(40, 20) * 1
    const fontSize2 = sw * (fontSize * 0.01)

    const x = Util.map(mx, 0, sw - fontSize2, -1, 1)
    const y = Util.map(my, 0, sh - fontSize2, -1, 1)

    const ease = 0.1

    // this._dist = MousePointer.instance.dist
    this._dist += (MousePointer.instance.dist - this._dist) * ease
    const it = Util.map(this._dist, 0, 5, 0, maxDist)

    const dx = MousePointer.instance.x - MousePointer.instance.old.x
    const dy = MousePointer.instance.y - MousePointer.instance.old.y

    // 向き
    const tgRot = Util.radian(Util.degree(Math.atan2(dy, dx)) + 90 - 45);
    const PI2 = Math.PI * 2;
    const PI3 = Math.PI * 3;
    const diff = (tgRot - this._rot.z % PI2 + PI3) % PI2 - Math.PI
    const newtgRot = this._rot.z + diff
    this._rot.z += (newtgRot - this._rot.z) * ease
    const ang = -45

    const hsl = new HSL()
    hsl.s = 1
    hsl.l = 0.5
    hsl.h = Util.map(this._dist, 0, 0.3, 0, maxDist)
    const col = new Color().setHSL(hsl.h, hsl.s, hsl.l)

    const txtCol = col.clone()
    txtCol.offsetHSL(0.5, -0.2, -0.2)

    const txtShadow = this._makeShadow(ang, col.getStyle(), it)

    Tween.set(this.el, {
      x: x + Math.sin(this._key * 0.15 + this._c * 0.05) * 15,
      y: y + Math.sin(this._key * 0.15 + this._c * -0.089) * 15,
      rotationZ: Util.degree(this._rot.z),
      textShadow:txtShadow,
      fontSize: fontSize + 'vw',
      color: txtCol.getStyle()
    })
  }
}







