import { GildedRose, Item } from "@/gilded-rose";


describe('Gilded Rose', () => {
    it('should decrease sellIn and quality of a normal item before sellIn date', () => {
        const gildedRose = new GildedRose([new Item('foo', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('foo');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(19);
    });

    it('should decrease sellIn and degrade quality twice as fast after sellIn date for a normal item', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(8);
    });

    it('should increase quality of Aged Brie over time and decrease sellIn when sellin is positive', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(1);
        expect(items[0].quality).toBe(1);
        
    });

    it('should increase quality of Aged Brie over time and decrease sellIn when sellin is negative', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', -1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(2);
      
  });

    it('should not increase quality of Aged Brie beyond 50', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 2, 49)]);
        gildedRose.updateQuality();
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(0);
        expect(items[0].quality).toBe(50);
    });

    it('should not change quality or sellIn of Sulfuras, and quality should always be 80', () => {
        const gildedRose = new GildedRose([
            new Item('Sulfuras, Hand of Ragnaros', 0, 80),
            new Item('Sulfuras, Hand of Ragnaros', -1, 80),
            new Item('Sulfuras, Hand of Ragnaros', 10, 80)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(0);
        expect(items[0].quality).toBe(80);
        expect(items[1].sellIn).toBe(-1);
        expect(items[1].quality).toBe(80);
        expect(items[2].sellIn).toBe(10);
        expect(items[2].quality).toBe(80);
    });

    it('should increase quality of Backstage passes by 1 when sellIn is above 10', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(14);
        expect(items[0].quality).toBe(21);
    });

    it('should increase quality of Backstage passes by 2 when sellIn is 10 or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(22);
    });

    it('should increase quality of Backstage passes by 3 when sellIn is 5 or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(23);
    });

    it('should drop quality of Backstage passes to 0 after concert', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(0);
        expect(items[0].quality).toBe(0);
    });

    it('should degrade quality of Conjured items twice as fast as normal items before sellIn date', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(18);
    });

    it('should degrade quality of Conjured items twice as fast after sellIn date', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(16);
    });

    it('should not increase quality of Backstage Pass items beyond 50', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
        gildedRose.updateQuality();
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
    });

    it('should not decrease quality below 0', () => {
        const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
    });

    it('should handle an array with multiple items correctly', () => {
      const items = [
          new Item('Aged Brie', 2, 0),
          new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
          new Item('Sulfuras, Hand of Ragnaros', 0, 80),
          new Item('Conjured Mana Cake', 3, 6),
          new Item('foo', 10, 20),
          new Item('Aged Brie', 10, 30),
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
          new Item('Sulfuras, Hand of Ragnaros', -1, 80),
          new Item('Conjured Mana Cake', 1, 7),
          new Item('normal', 0, 25)
      ];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      const expectedResults = [
          { name: 'Aged Brie', sellIn: 1, quality: 1 },
          { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 14, quality: 21 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          { name: 'Conjured Mana Cake', sellIn: 2, quality: 4 },
          { name: 'foo', sellIn: 9, quality: 19 },
          { name: 'Aged Brie', sellIn: 9, quality: 31 },
          { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 4, quality: 50 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: -1, quality: 80 },
          { name: 'Conjured Mana Cake', sellIn: 0, quality: 5 },
          { name: 'normal', sellIn: -1, quality: 23 }
      ];

      for (let i = 0; i < updatedItems.length; i++) {
          expect(updatedItems[i].name).toBe(expectedResults[i].name);
          expect(updatedItems[i].sellIn).toBe(expectedResults[i].sellIn);
          expect(updatedItems[i].quality).toBe(expectedResults[i].quality);
      }
  });
});
