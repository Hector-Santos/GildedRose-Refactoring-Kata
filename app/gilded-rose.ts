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
};

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const SULFURAS_QUALITY = 80;
const BACKSTAGE_THRESHOLD_FIRST = 10;
const BACKSTAGE_THRESHOLD_SECOND = 5;
const QUALITY_INCREMENT = 1;
const QUALITY_DECREMENT = 1;
const CONJURED_QUALITY_DECREMENT = 2;
const BACKSTAGE_INCREMENT_FIRST = 2;
const BACKSTAGE_INCREMENT_SECOND = 3;

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

  private increaseQuality(item: Item, amount: number = QUALITY_INCREMENT) {
    item.quality = Math.min(MAX_QUALITY, item.quality + amount);
  }

  private decreaseQuality(item: Item, amount: number = QUALITY_DECREMENT) {
    item.quality = Math.max(MIN_QUALITY, item.quality - amount);
  }

  private updateAgedBrie(item: Item) {
    item.sellIn--;
    this.increaseQuality(item);
  }

  private updateBackstagePasses(item: Item) {
    item.sellIn--;
    if (item.sellIn <= 0) {
      item.quality = MIN_QUALITY;
    } else if (item.sellIn < BACKSTAGE_THRESHOLD_SECOND) {
      this.increaseQuality(item, BACKSTAGE_INCREMENT_SECOND);
    } else if (item.sellIn < BACKSTAGE_THRESHOLD_FIRST) {
      this.increaseQuality(item, BACKSTAGE_INCREMENT_FIRST);
    } else {
      this.increaseQuality(item);
    }
  }

  private updateSulfuras(item: Item) {
    item.quality = SULFURAS_QUALITY;
  }

  private updateConjured(item: Item) {
    item.sellIn--;
    this.decreaseQuality(item, CONJURED_QUALITY_DECREMENT);
    if (item.sellIn < 0) {
      this.decreaseQuality(item, CONJURED_QUALITY_DECREMENT);
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
