import { MyDisplay } from "../core/myDisplay";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _itemNum: number = 1
  private _item: Array<Item> = []

  constructor(opt:any) {
    super(opt)

    for (let i = 0; i < this._itemNum; i++) {
      const div = document.createElement('div')
      div.classList.add('js-item')
      this.el.appendChild(div)
    }

    this.qsAll('.js-item').forEach((el:HTMLElement, i:number) => {
      this._item.push(new Item({
        el: el,
        key: i,
      }))
    })

    this._resize()
  }

  protected _update():void {
    super._update()
  }

  protected _resize(): void {
    super._resize()
  }
}