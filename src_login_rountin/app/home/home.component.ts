import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridsterComponent, IGridsterOptions, IGridsterDraggableOptions } from 'angular2gridster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  // currentUser: User;
  // users: User[] = [];
  widgets: Array<any>;
  title
  gridsterOptions: IGridsterOptions;
  static X_PROPERTY_MAP: any = {
    sm: 'xSm',
    md: 'xMd',
    lg: 'xLg',
    xl: 'xXl'
};

static Y_PROPERTY_MAP: any = {
    sm: 'ySm',
    md: 'yMd',
    lg: 'yLg',
    xl: 'yXl'
};

static W_PROPERTY_MAP: any = {
    sm: 'wSm',
    md: 'wMd',
    lg: 'wLg',
    xl: 'wXl'
};

static H_PROPERTY_MAP: any = {
    sm: 'hSm',
    md: 'hMd',
    lg: 'hLg',
    xl: 'hXl'
};
options: Object;
@ViewChild(GridsterComponent) gridster: GridsterComponent;
itemOptions = {
    maxWidth: 5,
    maxHeight: 6
};
  constructor() { 
    this.options = {
      // chart: { type: 'StockChart' },
      title : { text : 'simple chart' },
      series: [{
          data: [29.9, 71.5, 106.4, 129.2],
      }]
  };


  }

  ngOnInit() {
    this.widgets = [
      {
          dragAndDrop: true,
          resizable: true,
          title: 'Basic form inputs 1'
      },
      {
          x: 1, y: 0,
          w: 1, h: 2,
          // wSm: 2, hSm: 1,
          // wMd: 2, hMd: 1,
          // wLg: 3, hLg: 1,
          // wXl: 3, hXl: 1,
          dragAndDrop: true,
          resizable: true,
          title: 'Basic form inputs 2'
      },
      {
          x: 1, y: 1,
          w: 2, h: 1,
          wSm: 1, hSm: 2,
          wMd: 1, hMd: 2,
          wLg: 2, hLg: 1,
          wXl: 3, hXl: 1,
          dragAndDrop: true,
          resizable: true,
          title: 'Basic form inputs 3'
      },
      {
          x: 3, y: 1,
          w: 1, h: 2,
          wSm: 1, hSm: 2,
          wMd: 1, hMd: 2,
          wLg: 3, hLg: 1,
          wXl: 3, hXl: 1,
          dragAndDrop: true,
          resizable: true,
          title: 'Basic form inputs 4'
      },
      {
          w: 1, h: 2,
          wSm: 1, hSm: 2,
          wMd: 1, hMd: 2,
          wLg: 3, hLg: 1,
          wXl: 3, hXl: 1,
          dragAndDrop: true,
          resizable: true,
          title: 'Basic form inputs x'
      }
  ];

this.gridsterOptions = {
  lanes: 2, // how many lines (grid cells) dashboard has
  direction: 'vertical', // items floating direction: vertical/horizontal/none
  floating: false, // default=true - prevents items to float according to the direction (gravity)
  dragAndDrop: false, // possible to change items position by drag n drop
  resizable: false, // possible to resize items by drag n drop by item edge/corner
  useCSSTransforms: true, // Uses CSS3 translate() instead of position top/left - significant performance boost.
  responsiveSizes: true, // allow to set different item sizes for different breakpoints
  // ResponsiveOptions can overwrite default configuration with any option available for specific breakpoint.
  responsiveOptions: [
        {
            breakpoint: 'sm',
            lanes: 3
        },
        {
            breakpoint: 'md',
            minWidth: 768,
            lanes: 4,
            dragAndDrop: true,
            resizable: true
        },
        {
            breakpoint: 'lg',
            lanes: 6,
            dragAndDrop: true,
            resizable: true
        },
        {
            breakpoint: 'xl',
            minWidth: 1800,
            lanes: 8,
            dragAndDrop: true,
            resizable: true
        }
    ]
};
  }


  onReflow(event) {
    console.log('onReflow', event);
}

removeLine(gridster: GridsterComponent) {
    gridster.setOption('lanes', --this.gridsterOptions.lanes)
        .reload();
}

getTitle() {
    return this.title;
}

addLine(gridster: GridsterComponent) {
    gridster.setOption('lanes', ++this.gridsterOptions.lanes)
        .reload();
}

setWidth(widget: any, size: number, e: MouseEvent, gridster) {
    e.stopPropagation();
    e.preventDefault();
    if (size < 1) {
        size = 1;
    }
    widget.w = size;

    gridster.reload();

    return false;
}

setHeight(widget: any, size: number, e: MouseEvent, gridster) {
    e.stopPropagation();
    e.preventDefault();
    if (size < 1) {
        size = 1;
    }
    widget.h = size;

    gridster.reload();

    return false;
}

optionsChange(options: IGridsterOptions) {
    this.gridsterOptions = options;
    console.log('options change:', options);
}

swap() {
    this.widgets[0].x = 3;
    this.widgets[3].x = 0;
}

addWidgetFromDrag(gridster: GridsterComponent, event: any) {
    const item = event.item;
    const breakpoint = gridster.options.breakpoint;
    const widget = {
        dragAndDrop: true,
        resizable: true,
        title: 'New widget'
    };

    widget[HomeComponent.W_PROPERTY_MAP[breakpoint] || 'w'] = item.w;
    widget[HomeComponent.H_PROPERTY_MAP[breakpoint] || 'h'] = item.h;
    widget[HomeComponent.X_PROPERTY_MAP[breakpoint] || 'x'] = item.x;
    widget[HomeComponent.Y_PROPERTY_MAP[breakpoint] || 'y'] = item.y;

    for (const rwdProp of ['wSm', 'hSm', 'wMd', 'hMd', 'wLg', 'hLg', 'wXl', 'hXl']) {
        if (event.item.itemPrototype.hasOwnProperty(rwdProp)) {
            widget[rwdProp] = event.item.itemPrototype[rwdProp];
        }
    }

    this.widgets.push(widget);

    console.log('add widget from drag to:', gridster);
}

over(event) {
    const size = event.item.calculateSize(event.gridster);

    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.width = size.width + 'px';
    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.height = size.height + 'px';
    event.item.itemPrototype.$element.classList.add('is-over');
}

out(event) {
    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.width = '';
    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.height = '';
    event.item.itemPrototype.$element.classList.remove('is-over');
}

addWidgetWithoutData() {
    this.widgets.push({
        title: 'Basic form inputs X',
        dragAndDrop: true,
        resizable: true,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
        'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
        'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
        'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
        'laborum.'
    });
}

addWidget(gridster: GridsterComponent) {
    this.widgets.push({
        x: 4, y: 0, w: 1, h: 1,
        dragAndDrop: true,
        resizable: true,
        title: 'Basic form inputs 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
        'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
        'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
        'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
        'laborum.'
    });
    console.log('widget push', this.widgets[this.widgets.length - 1]);
}

remove($event, index: number, gridster: GridsterComponent) {
    $event.preventDefault();
    this.widgets.splice(index, 1);
    console.log('widget remove', index);
}

removeAllWidgets() {
    this.widgets = [];
}

itemChange($event: any, gridster) {
    console.log('item change', $event);
}

resetWidgets() {
    // this.widgets = this.widgetsCopy.map(widget => ({...widget}));
}

}
