export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const itemTypes = {
  CHEESE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  CONJURED: 'Conjured Mana Cake'
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case itemTypes.CHEESE:
          this.updateAgedBrie(item);
          continue;
        case itemTypes.BACKSTAGE_PASSES:
          this.updateBackstagePasses(item);
          continue;
        case itemTypes.SULFURAS:
          this.updateSulfuras(item);
          continue;
        case itemTypes.CONJURED:
          this.updateConjured(item);
          continue;
        default:
          this.updateNormal(item);
          break;
      }
    }
    return this.items;
  }

  private increaseQuality(item: Item, amount: number = 1) {
    item.quality = Math.min(50, item.quality + amount);
  }

  private decreaseQuality(item: Item, amount: number = 1) {
    item.quality = Math.max(0, item.quality - amount);
  }

  private updateAgedBrie(item: Item) {
    item.sellIn--;
    this.increaseQuality(item);
  }

  private updateBackstagePasses(item: Item) {
    item.sellIn--;
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn < 5) {
      this.increaseQuality(item, 3);
    } else if (item.sellIn < 10) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item);
    }
  }

  private updateSulfuras(item: Item) {
    item.quality = 80;
  }

  private updateConjured(item: Item) {
    item.sellIn--;
    this.decreaseQuality(item, 2);
    if (item.sellIn < 0) {
      this.decreaseQuality(item, 2);
    }
  }

  private updateNormal(item: Item) {
    item.sellIn--;
    this.decreaseQuality(item);
    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }
}
