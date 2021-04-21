import { PaymentItemStatus as InputState } from "./order.model";

enum State{
  NONE,
  NEW,
  CHANGED,
  DELETED
}

class ItemState{
  state: State;

  constructor(){
    this.state = null;
  };

  changeState(newState: InputState){
    if(this.state === null){
      if(newState === InputState.NOT_VALID){
        this.state = State.DELETED;
      }
      else if(newState === InputState.NO_CHANGE){
        this.state = State.NONE;
      }
      else {
        this.state = State.NEW;
      }
    }
    else if(this.state === State.DELETED || this.state === State.NEW){
      this.state = State.CHANGED;
    }
  }
}

interface Value{
  value?: any,
  old_value?: any
}

export interface ProductItem{
  [key: string]: Value;
}

interface Node {items: ProductItem, state: ItemState};

export class ItemDiffer{
  private map: Map<number, Node> = new Map();
  public nodes: Node[] = [];

  constructor(){}

  insertItem(key: number, item: {[key: string]: any}, newState: InputState){
    let temp = this.map.get(key);
    if(temp === null || temp === undefined){
      temp = {
        items: {},
        state: new ItemState()
      };
    }

    temp.state.changeState(newState);
    const properties = Object.entries(item);

    for(let i = 0; i < properties.length; ++i){
      if(newState === InputState.NOT_VALID){
        if(temp.items[properties[i][0]] === undefined){
          temp.items[properties[i][0]] = {old_value: properties[i][1]};
        }
        else {
          temp.items[properties[i][0]].old_value = properties[i][1];
        }
      } else{
        if(temp.items[properties[i][0]] === undefined){
          temp.items[properties[i][0]] = {value: properties[i][1]};
        }
        else {
          temp.items[properties[i][0]].value = properties[i][1];
        }
      }
    }

    this.map.set(key, temp);
  }

  finishInitialization(){
    this.nodes = Array.from(this.map.values());
  }

}
