import { action, computed, makeObservable, observable } from "mobx";

import { EProfitTargetFields, IProfitTarget, type OrderSide } from "../model";

export class PlaceOrderStore {
  constructor() {
    makeObservable(this);
  }

  @observable activeOrderSide: OrderSide = "buy";
  @observable price = 0;
  @observable amount = 0;
  @observable isTakeProfitActive: boolean = false
  @observable profitTargets: Array<IProfitTarget> = [];
  @observable errors: Array<string> = []

  @action
  public addProfitTargets = (value: IProfitTarget) => {
    this.profitTargets.push(value)
    this.calculateAmountToCell()
  }

  @action
  public updateProfitTargets = (idx: number, value:number) => {
    const exp = this.activeOrderSide === 'buy' ? 1 + (value / 100) : 1 - (value / 100)
    this.profitTargets[idx][EProfitTargetFields.TARGET_PRICE] = this.price * (exp);
  }

  @action
  public changeProfitTarget = (idx: number, filed: EProfitTargetFields, value: string) => {
    this.profitTargets[idx][filed] = Number(value);

    filed === EProfitTargetFields.AMOUNT_TO_CELL && this.calculateAmountToCell()
  }

  @action
  public updateTargetPrice = (idx: number, value:number) => {
    this.profitTargets[idx][EProfitTargetFields.PROFIT] = Math.abs(Math.ceil((value - this.price) / value * 100));
  }

  @computed
  get getProjectedProfit() {
    return this.profitTargets.reduce((total, current) => {
      let amountToCell = current.amountToCell / 100;
      const exp = this.activeOrderSide === 'buy' ? current.targetPrice - this.price : this.price - current.targetPrice;

      const targetProfit = amountToCell * (exp) * this.amount
      return total + targetProfit;
    }, 0);
  }

  @action
  public validateProfitTargets = () => {
    this.errors = [];

    const totalProfit = this.profitTargets.reduce((sum, target) => sum + target.profit, 0);
    if (totalProfit > 500) {
      this.errors.push("Maximum profit sum is 500%");
    }

    this.profitTargets.forEach((target) => {
      if (target.profit < 0.01) {
        this.errors.push("Minimum value is 0.01%");
      }
    });

    for (let i = 1; i < this.profitTargets.length; i++) {
      if (this.profitTargets[i].profit <= this.profitTargets[i - 1].profit) {
        this.errors.push("Each target's profit should be greater than the previous one");
        break;
      }
    }

    this.profitTargets.forEach((target) => {
      if (target.targetPrice <= 0) {
        this.errors.push("Price must be greater than 0");
      }
    });

    const totalAmount = this.profitTargets.reduce((sum, target) => sum + target.amountToCell, 0);
    if (totalAmount > 100) {
      const excess = totalAmount - 100;
      this.errors.push(`${totalAmount}% out of 100% selected. Please decrease by ${excess.toFixed(2)}%`);
    } else if (totalAmount < 100) {
      const deficit = 100 - totalAmount;
      this.errors.push(`${totalAmount}% out of 100% selected. Please increase by ${deficit.toFixed(2)}%`);
    }
  }

  @action
  public updateAllTargetPrices = () => {
    this.profitTargets = this.profitTargets.map(target => ({
      ...target,
      targetPrice: this.calculateTargetPrice(target.profit)
    }));
  }

  @action
  public calculateTargetPrice(profit: number) {
    return this.activeOrderSide === 'buy'
        ? this.price * (1 + profit / 100)
        : this.price * (1 - profit / 100);
  }

  @action
  public setIsTakeProfitActive = (isActive: boolean) => {
    this.isTakeProfitActive = isActive;
  };

  @action
  public setProfitTargets = (value: IProfitTarget) => {
    this.profitTargets.push(value)
  };

  @action
  public clearProfitTargets = () => {
    this.profitTargets = [];
  }

  @action
  public removeProfitTargets = (idx: number) => {
    this.profitTargets.splice(idx, 1);
  }

  @action
  public calculateAmountToCell = () => {
    const totalAmount = this.profitTargets.reduce((total, current) => total + current.amountToCell, 0);

    if (totalAmount >= 100) {
      const largestTarget = this.profitTargets.reduce((prev, curr) => prev.amountToCell > curr.amountToCell ? prev : curr);
      largestTarget.amountToCell -= (totalAmount - 100);
    }
  }

  @action
  public clearErrors = () => {
    this.errors = [];
  }

  @computed get total(): number {
    return this.price * this.amount;
  }

  @action
  public setOrderSide = (side: OrderSide) => {
    this.activeOrderSide = side;
  };

  @action
  public setPrice = (price: number) => {
    this.price = price;
  };

  @action
  public setAmount = (amount: number) => {
    this.amount = amount;
  };

  @action
  public setTotal = (total: number) => {
    this.amount = this.price > 0 ? total / this.price : 0;
  };
}
