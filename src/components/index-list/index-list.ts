/**
 * Created by EmiyaLee on 2017/1/11.
 */
import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Utils} from 'emiya-js-utils';
import {IndexListDivider} from "../../models/IndexListDivider";
import {Content} from 'ionic-angular';
import {Item} from '../../models/Item'

@Component({
  selector: 'index-list',
  templateUrl: 'index-list.html',
})

export class IndexList {


  @Input() name: any;
  @Input() height: number = null;

  @Input() width: number = null;
  @Input() model: Array<Item> = new Array<Item>();
  //@Output() modelChange = new EventEmitter<Array<Item>>();
  @Output() itemClick = new EventEmitter<Item>();
  private cloneData: Array<Item>;
  private innerData: Array<IndexListDivider>;
  //@ViewChild("content") content: Content;
  private contentDom: HTMLElement;
  index = new Array<any>();
  private scrollContent;
  indexHeight: number;
  @Input() top: number;
  indexTop: number;
  //wraaperDom: HTMLElement;
  indexContainerHeight: number;

  uuid = new Date().getTime()

  constructor() {
    for (let c = 65; c < 91; ++c) {
      let k = {name: String.fromCharCode(c).toUpperCase(), index: c};
      this.index.push(k)
    }
    let k = {name: "#", index: 91};
    this.index.push(k)
  }

  ngAfterViewInit() {
    //console.log(this.scrollContent);

    this.contentDom = document.getElementById("content" + this.uuid);
    this.scrollContent = this.contentDom;
    //console.log(this.scrollContent);
    //this.wraaperDom = document.getElementById("wrapper" + this.uuid);
    //this.indexHeight = this.wraaperDom.offsetHeight * 0.9 / this.index.length;
    //this.indexTop = this.top + this.wraaperDom.offsetHeight * 0.05;
    //console.log(this.wraaperDom.offsetTop)
    //this.indexContainerHeight = this.wraaperDom.offsetHeight * 0.9
    // this.content.ionScroll.subscribe((ev) => {
    //   console.log(ev)
    //   console.log(Utils.getElementXY(document.getElementById("A" + this.uuid), this.contentDom))
    // });
    // setTimeout(() => {
    //
    // })
  }

  getIndexTop(): number {
    if (this.contentDom)
      return this.top + this.contentDom.offsetHeight * 0.05;
    else
      return 0;
  }

  getIndexContainerHeight(): number {
    if (this.contentDom)
      return this.contentDom.offsetHeight * 0.9;
    else
      return 0;
  }

  getIndexHeight(): number {
    if (this.contentDom)
      return this.contentDom.offsetHeight * 0.9 / this.index.length;
    else
      return 0;
  }

  format(data: Array<Item>): Array<IndexListDivider> {
    this.cloneData = Utils.deepCopy(data);
    this.cloneData.sort(this.sortList.bind(this));

    this.innerData = new Array<IndexListDivider>();

    let currentCharCode: number = null;
    for (let c in this.cloneData) {
      let charCode = this.getFirstCharCode(this.cloneData[c].name);
      if (charCode >= 65 && charCode <= 90.1) {
        if (currentCharCode != null) {
          if (currentCharCode == Math.floor(charCode)) {
            this.innerData[this.innerData.length - 1].list.push(this.cloneData[c]);
          } else {
            currentCharCode = Math.floor(charCode);
            let divider = new IndexListDivider();
            divider.character = String.fromCharCode(currentCharCode).toUpperCase();
            divider.index = currentCharCode;
            divider.list.push(this.cloneData[c])
            this.innerData.push(divider);
          }
        } else {
          currentCharCode = Math.floor(charCode);
          let divider = new IndexListDivider();
          divider.character = String.fromCharCode(currentCharCode).toUpperCase();
          divider.index = currentCharCode;
          divider.list.push(this.cloneData[c])
          this.innerData.push(divider);
        }
      } else {
        if (currentCharCode != 91) {
          currentCharCode = 91;
          let divider = new IndexListDivider();
          divider.character = "#";
          divider.index = 91;
          divider.list.push(this.cloneData[c])
          this.innerData.push(divider);
        } else {
          this.innerData[this.innerData.length - 1].list.push(this.cloneData[c]);
        }

      }
    }

    return this.innerData;
  }

  go(data) {
    //console.log(this.content)
    let closestIndex = null;
    for (let c in this.innerData) {
      if (this.innerData[c].index <= data.index) {
        closestIndex = this.innerData[c];
      }
    }
    //console.log(this.content.scrollTop)
    //console.log(Utils.getElementXY(document.getElementById(closestIndex.character + this.uuid), this.contentDom).y);
    //console.log(this.contentDom.scrollTop)
    //console.log(document.getElementById(closestIndex.character + this.uuid).offsetParent)
    //console.log(Utils.getElementXY(document.getElementById(closestIndex.character + this.uuid), this.contentDom))
    this.contentDom.scrollTop = this.scrollContent.scrollTop + Utils.getElementXY(document.getElementById(closestIndex.character + this.uuid), this.contentDom).y;


  }

  private sortList(a: Item, b: Item): number {
    let r = this.getFirstCharCode(a.name) - this.getFirstCharCode(b.name);
    if (r == 0) {
      for (let k = 1; k < a.displayName.length || k < b.displayName.length; ++k) {
        r = a.displayName.charCodeAt(k) - b.displayName.charCodeAt(k)
        if (r != 0)
          return r;
      }
    }
    return r;
  }

  // ngAfterViewChecked() {
  //   let j: Array<IndexListDivider> = this.format(this.model);
  //   for (let k in j) {
  //     for (let z in j[k].list) {
  //       document.getElementById(this.uuid + j[k].list[z].id).onclick = (ev) => {
  //         this.select(ev, j[k].list[z])
  //       }
  //     }
  //   }
  // }

  select(ev, data) {
    // ev.preventDefault()
    // ev.stopPropagation()
    this.itemClick.emit(data);
  }

  trackByFn(index, record) {
    //console.log(record)
    //console.log(record[index].id)
    return record.id
  }

  trackByFn2(index, record) {
    //console.log(record)
    //console.log(record[index].id)
    return record.character + this.uuid
  }

  trackByFn3(index, record) {
    //console.log(record)
    //console.log(record[index].id)
    return record.index
  }

  private getFirstCharCode(a: string): number {
    let charA = a.charCodeAt(0);
    if (charA >= 97 && charA < 123)
      charA -= 31.9;
    else if (charA < 65 || charA >= 91)
      charA += 91;
    return charA;
  }

  // listen(_value) {
  //   // console.log(_value);
  //   this.modelChange.emit(_value);
  // }

}

