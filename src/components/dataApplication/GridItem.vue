<template>
    <div ref="item"
         class="vue-grid-item"
         :class="{ 'vue-resizable' : resizable, 'resizing' : isResizing, 'vue-draggable-dragging' : isDragging, 'cssTransforms' : useCssTransforms }"
         :style="style"
    >
        <slot></slot>
        <span v-if="resizable" ref="handle" :class="resizableHandleClass"></span>
        <!--<span v-if="draggable" ref="dragHandle" class="vue-draggable-handle"></span>-->
    </div>
</template>
<style>
    .vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #fff;
    /* border: 1px solid black; */
}
.vue-grid-item:hover {
    /* border: 1px solid black;  */
    box-shadow:2px 4px 2px #aaa;
}


.vue-grid-item.resizing {
    opacity: 0.9;
}

.vue-grid-item.static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
    .vue-grid-item {
        transition: all 200ms ease;
        transition-property: left, top, right;
        border-radius: 10px;
        /* add right for rtl */
    }

    .vue-grid-item.cssTransforms {
        transition-property: transform;
    }

    .vue-grid-item.resizing {
        opacity: 0.6;
        z-index: 3;
    }

    .vue-grid-item.vue-draggable-dragging {
        transition:none;
        z-index: 3;
    }

    .vue-grid-item.vue-grid-placeholder {
        background: red;
        opacity: 0.2;
        transition-duration: 100ms;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }

    .vue-grid-item > .vue-resizable-handle {
        position: absolute;
        width: 20px;
        height: 20px;
        bottom: 0;
        right: 0;
        background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
        background-position: bottom right;
        padding: 0 3px 3px 0;
        background-repeat: no-repeat;
        background-origin: content-box;
        box-sizing: border-box;
        cursor: se-resize;
    }

    .vue-grid-item > .vue-rtl-resizable-handle {
        bottom: 0;
        left: 0;
        background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAuMDAwMDAwMDAwMDAwMDAyIiBoZWlnaHQ9IjEwLjAwMDAwMDAwMDAwMDAwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9Im5vbmUiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSIxMiIgd2lkdGg9IjEyIiB5PSItMSIgeD0iLTEiLz4KICA8ZyBkaXNwbGF5PSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgeT0iMCIgeD0iMCIgaGVpZ2h0PSIxMDAlIiB3aWR0aD0iMTAwJSIgaWQ9ImNhbnZhc0dyaWQiPgogICA8cmVjdCBmaWxsPSJ1cmwoI2dyaWRwYXR0ZXJuKSIgc3Ryb2tlLXdpZHRoPSIwIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIi8+CiAgPC9nPgogPC9nPgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxsaW5lIGNhbnZhcz0iI2ZmZmZmZiIgY2FudmFzLW9wYWNpdHk9IjEiIHN0cm9rZS1saW5lY2FwPSJ1bmRlZmluZWQiIHN0cm9rZS1saW5lam9pbj0idW5kZWZpbmVkIiBpZD0ic3ZnXzEiIHkyPSItNzAuMTc4NDA3IiB4Mj0iMTI0LjQ2NDE3NSIgeTE9Ii0zOC4zOTI3MzciIHgxPSIxNDQuODIxMjg5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIi8+CiAgPGxpbmUgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z181IiB5Mj0iOS4xMDY5NTciIHgyPSIwLjk0NzI0NyIgeTE9Ii0wLjAxODEyOCIgeDE9IjAuOTQ3MjQ3IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KICA8bGluZSBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z183IiB5Mj0iOSIgeDI9IjEwLjA3MzUyOSIgeTE9IjkiIHgxPSItMC42NTU2NCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiM2NjY2NjYiIGZpbGw9Im5vbmUiLz4KIDwvZz4KPC9zdmc+);
        background-position: bottom left;
        padding-left: 3px;
        background-repeat: no-repeat;
        background-origin: content-box;
        cursor: sw-resize;
        right: auto;
    }
</style>
<script>
    import {setTopLeft, setTopRight, setTransformRtl, setTransform, createMarkup, getLayoutItem} from './utils';
    import {getControlPosition, offsetXYFromParentOf, createCoreData} from './draggableUtils';
    //    var eventBus = require('./eventBus');

    var interact = require("interactjs");

    export default {
        name: "GridItem",
        props: {
            isDraggable: {
                type: Boolean,
                required: false,
                default: null
            },
            isResizable: {
                type: Boolean,
                required: false,
                default: null
            },
            minH: {
                type: Number,
                required: false,
                default: 1
            },
            minW: {
                type: Number,
                required: false,
                default: 1
            },
            maxH: {
                type: Number,
                required: false,
                default: Infinity
            },
            maxW: {
                type: Number,
                required: false,
                default: Infinity
            },
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            w: {
                type: Number,
                required: true
            },
            h: {
                type: Number,
                required: true
            },
            i: {
                required: true
            },
            dragIgnoreFrom: {
                type: String,
                required: false,
                default: 'a, button'
            },
            dragAllowFrom: {
                type: String,
                required: false,
                default: null
            },
            resizeIgnoreFrom: {
                type: String,
                required: false,
                default: 'a, button'
            },
        },
        inject: ["eventBus"],
        data: function () {
            return {
                cols: 1,
                containerWidth: 100,
                rowHeight: 30,
                margin: [10, 10],
                maxRows: Infinity,
                draggable: null,
                resizable: null,
                useCssTransforms: true,

                isDragging: false,
                dragging: null,
                isResizing: false,
                resizing: null,
                lastX: NaN,
                lastY: NaN,
                lastW: NaN,
                lastH: NaN,
                style: {},
                rtl: false,

                dragEventSet: false,
                resizeEventSet: false,

                previousW: null,
                previousH: null,
                previousX: null,
                previousY: null,
            }
        },
        created () {
            var self = this;

            // Accessible refernces of functions for removing in beforeDestroy
            self.updateWidthHandler = function (width) {
                self.updateWidth(width);
            };

            self.compactHandler = function (layout) {
                self.compact(layout);
            };

            self.setDraggableHandler = function (isDraggable) {
                if (self.isDraggable === null) {
                    self.draggable = isDraggable;
                }
            };

            self.setResizableHandler = function (isResizable) {
                if (self.isResizable === null) {
                    self.resizable = isResizable;
                }
            };

            self.setRowHeightHandler = function (rowHeight) {
                self.rowHeight = rowHeight;
            };

            self.directionchangeHandler = (direction) => {
                var direction = (document.dir !== undefined) ?
                    document.dir :
                    document.getElementsByTagName("html")[0].getAttribute("dir");
                this.rtl = (direction === "rtl");
                this.compact();
            };

            this.eventBus.$on('updateWidth', self.updateWidthHandler);
            this.eventBus.$on('compact', self.compactHandler);
            this.eventBus.$on('setDraggable', self.setDraggableHandler);
            this.eventBus.$on('setResizable', self.setResizableHandler);
            this.eventBus.$on('setRowHeight', self.setRowHeightHandler);
            this.eventBus.$on('directionchange', self.directionchangeHandler);

            /*this.eventBus.$on('setColNum', function(colNum) {
             self.cols = colNum;
             });*/
            var direction = (document.dir !== undefined) ?
                document.dir :
                document.getElementsByTagName("html")[0].getAttribute("dir");
            this.rtl = (direction === "rtl");
        },
        beforeDestroy: function(){
            var self = this;
            //Remove listeners
            this.eventBus.$off('updateWidth', self.updateWidthHandler);
            this.eventBus.$off('compact', self.compactHandler);
            this.eventBus.$off('setDraggable', self.setDraggableHandler);
            this.eventBus.$off('setResizable', self.setResizableHandler);
            this.eventBus.$off('setRowHeight', self.setRowHeightHandler);
            this.eventBus.$off('directionchange', self.directionchangeHandler);
        },
        mounted: function () {
            this.cols = this.$parent.colNum;
            this.rowHeight = this.$parent.rowHeight;
            this.containerWidth = this.$parent.width !== null ? this.$parent.width : 100;
            this.margin = this.$parent.margin !== undefined ? this.$parent.margin : [10, 10];
            this.maxRows = this.$parent.maxRows;
            if (this.isDraggable === null) {
                this.draggable = this.$parent.isDraggable;
            } else {
                this.draggable = this.isDraggable;
            }
            if (this.isResizable === null) {
                this.resizable = this.$parent.isResizable;
            } else {
                this.resizable = this.isResizable;
            }
            this.useCssTransforms = this.$parent.useCssTransforms;
            this.createStyle();
        },
        watch: {
            isDraggable: function () {
                this.draggable = this.isDraggable;
            },
            draggable: function () {
                var self = this;
                if (this.interactObj === null || this.interactObj === undefined) {
                    this.interactObj = interact(this.$refs.item);
                }
                if (this.draggable) {
                    var opts = {
                        ignoreFrom: this.dragIgnoreFrom,
                        allowFrom: this.dragAllowFrom
                    }
                    this.interactObj.draggable(opts);
                    /*this.interactObj.draggable({allowFrom: '.vue-draggable-handle'});*/
                    if (!this.dragEventSet) {
                        this.dragEventSet = true;
                        this.interactObj.on('dragstart dragmove dragend', function (event) {
                            self.handleDrag(event);
                        });
                    }
                } else {
                    this.interactObj.draggable({
                        enabled: false
                    });
                }
            },
            isResizable: function () {
                this.resizable = this.isResizable;
            },
            resizable: function () {
                var self = this;
                if (this.interactObj === null || this.interactObj === undefined) {
                    this.interactObj = interact(this.$refs.item);
                }
                if (this.resizable) {
                    var opts = {
                        preserveAspectRatio: false,
                        edges: {left: false, right: true, bottom: true, top: false},
                        ignoreFrom: this.resizeIgnoreFrom
                    };
                    
                    this.interactObj.resizable(opts);
                    if (!this.resizeEventSet) {
                        this.resizeEventSet = true;
                        this.interactObj
                            .on('resizestart resizemove resizeend', function (event) {
                                self.handleResize(event);
                            });
                    }
                } else {
                    this.interactObj.resizable({
                        enabled: false
                    });
                }
            },
            rowHeight: function () {
                this.createStyle();
            },
            cols: function () {
                this.createStyle();
            },
            containerWidth: function () {
                this.createStyle();
            },
            x: function () {
                this.createStyle();
            },
            y: function () {
                this.createStyle();
            },
            h: function () {
                this.createStyle();
            },
            w: function () {
                this.createStyle();
            }
        },
        computed: {
            resizableHandleClass() {
                if (this.rtl) {
                    return 'vue-resizable-handle vue-rtl-resizable-handle';
                } else {
                    return 'vue-resizable-handle';
                }
            }
        },
        methods: {
            createStyle: function () {
                if (this.x + this.w > this.cols) {
                    this.x = 0;
                    this.w = this.cols;
                }

                var pos = this.calcPosition(this.x, this.y, this.w, this.h);
                
                console.log('hhh'+pos.width);
                this.$emit("update", pos.width);
                if (this.isDragging) {
                    pos.top = this.dragging.top;
//                    Add rtl support
                    if (this.rtl) {
                        pos.right = this.dragging.left;
                    } else {
                        pos.left = this.dragging.left;
                    }
                }
                if (this.isResizing) {
                    pos.width = this.resizing.width;
                    pos.height = this.resizing.height;
                    this.width = pos.width;
                }

                let style;
                // CSS Transforms support (default)
                if (this.useCssTransforms) {
//                    Add rtl support
                    if (this.rtl) {
                        style = setTransformRtl(pos.top, pos.right, pos.width, pos.height);
                    } else {
                        style = setTransform(pos.top, pos.left, pos.width, pos.height);
                    }

                } else { // top,left (slow)
//                    Add rtl support
                    if (this.rtl) {
                        style = setTopRight(pos.top, pos.right, pos.width, pos.height);
                    } else {
                        style = setTopLeft(pos.top, pos.left, pos.width, pos.height);
                    }
                }
                this.style = style;

            },
            handleResize: function (event) {
                const position = getControlPosition(event);
                // Get the current drag point from the event. This is used as the offset.
                if (position == null) return; // not possible but satisfies flow
                const {x, y} = position;

                const newSize = {width: 0, height: 0};
                switch (event.type) {
                    case "resizestart":
                        this.previousW = this.w;
                        this.previousH = this.h;
                        var pos = this.calcPosition(this.x, this.y, this.w, this.h);
                        newSize.width = pos.width;
                        newSize.height = pos.height;
                        this.resizing = newSize;
                        this.isResizing = true;
                        break;
                    case "resizemove":
//                        console.log("### resize => " + event.type + ", lastW=" + this.lastW + ", lastH=" + this.lastH);
                        const coreEvent = createCoreData(this.lastW, this.lastH, x, y);
                        if (this.rtl) {
                            newSize.width = this.resizing.width - coreEvent.deltaX;
                        } else {
                            newSize.width = this.resizing.width + coreEvent.deltaX;
                        }
                        newSize.height = this.resizing.height + coreEvent.deltaY;

                        ///console.log("### resize => " + event.type + ", deltaX=" + coreEvent.deltaX + ", deltaY=" + coreEvent.deltaY);
                        this.resizing = newSize;
                        break;
                    case "resizeend":
                        //console.log("### resize end => x=" +this.x + " y=" + this.y + " w=" + this.w + " h=" + this.h);
                        var pos = this.calcPosition(this.x, this.y, this.w, this.h);
                        newSize.width = pos.width;
                        newSize.height = pos.height;
//                        console.log("### resize end => " + JSON.stringify(newSize));
                        this.resizing = null;
                        this.isResizing = false;
                        break;
                }

                // Get new WH
                var pos = this.calcWH(newSize.height, newSize.width);
                if (pos.w < this.minW) {
                    pos.w = this.minW;
                }
                if (pos.w > this.maxW) {
                    pos.w = this.maxW;
                }
                if (pos.h < this.minH) {
                    pos.h = this.minH;
                }
                if (pos.h > this.maxH) {
                    pos.h = this.maxH;
                }

                if (pos.h < 1) {
                    pos.h = 1;
                }
                if (pos.w < 1) {
                    pos.w = 1;
                }

                this.lastW = x;
                this.lastH = y;

                if (this.w !== pos.w || this.h !== pos.h) {
                    this.$emit("resize", this.i, pos.h, pos.w, newSize.height, newSize.width);
                }
                if (event.type === "resizeend" && (this.previousW !== this.w || this.previousH !== this.h)) {
                    this.$emit("resized", this.i, pos.h, pos.w, newSize.height, newSize.width);
                }
                this.eventBus.$emit("resizeEvent", event.type, this.i, this.x, this.y, pos.h, pos.w);
            },
            handleDrag(event) {
                if (this.isResizing) return;

                const position = getControlPosition(event);

                // Get the current drag point from the event. This is used as the offset.
                if (position === null) return; // not possible but satisfies flow
                const {x, y} = position;

                var shouldUpdate = false;
                const newPosition = {top: 0, left: 0};
                switch (event.type) {
                    case "dragstart":
                        this.previousX = this.x;
                        this.previousY = this.y;

                        var parentRect = event.target.offsetParent.getBoundingClientRect();
                        var clientRect = event.target.getBoundingClientRect();
                        if (this.rtl) {
                            newPosition.left = (clientRect.right - parentRect.right) * -1;
                        } else {
                            newPosition.left = clientRect.left - parentRect.left;
                        }
                        newPosition.top = clientRect.top - parentRect.top;
                        this.dragging = newPosition;
                        this.isDragging = true;
                        break;
                    case "dragend":
                        if (!this.isDragging) return;
                        parentRect = event.target.offsetParent.getBoundingClientRect();
                        clientRect = event.target.getBoundingClientRect();
//                        Add rtl support
                        if (this.rtl) {
                            newPosition.left = (clientRect.right - parentRect.right) * -1;
                        } else {
                            newPosition.left = clientRect.left - parentRect.left;
                        }
                        newPosition.top = clientRect.top - parentRect.top;
//                        console.log("### drag end => " + JSON.stringify(newPosition));
//                        console.log("### DROP: " + JSON.stringify(newPosition));
                        this.dragging = null;
                        this.isDragging = false;
                        shouldUpdate = true;
                        break;
                    case "dragmove":
                        const coreEvent = createCoreData(this.lastX, this.lastY, x, y);
//                        Add rtl support
                        if (this.rtl) {
                            newPosition.left = this.dragging.left - coreEvent.deltaX;
                        } else {
                            newPosition.left = this.dragging.left + coreEvent.deltaX;
                        }
                        newPosition.top = this.dragging.top + coreEvent.deltaY;
//                        console.log("### drag => " + event.type + ", x=" + x + ", y=" + y);
//                        console.log("### drag => " + event.type + ", deltaX=" + coreEvent.deltaX + ", deltaY=" + coreEvent.deltaY);
//                        console.log("### drag end => " + JSON.stringify(newPosition));
                        this.dragging = newPosition;
                        break;
                }

                // Get new XY
                if (this.rtl) {
                    var pos = this.calcXY(newPosition.top, newPosition.left);
                } else {
                    var pos = this.calcXY(newPosition.top, newPosition.left);
                }

                this.lastX = x;
                this.lastY = y;

                if (this.x !== pos.x || this.y !== pos.y) {
                    this.$emit("move", this.i, pos.x, pos.y);
                }
                if (event.type === "dragend" && (this.previousX !== this.x || this.previousY !== this.y)) {
                    this.$emit("moved", this.i, pos.x, pos.y);
                }
                this.eventBus.$emit("dragEvent", event.type, this.i, pos.x, pos.y, this.h, this.w);
            },
            calcPosition: function (x, y, w, h) {
                const colWidth = this.calcColWidth();
                // add rtl support
                if (this.rtl) {
                    var out = {
                        right: Math.round(colWidth * x + (x + 1) * this.margin[0]),
                        top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
                        // 0 * Infinity === NaN, which causes problems with resize constriants;
                        // Fix this if it occurs.
                        // Note we do it here rather than later because Math.round(Infinity) causes deopt
                        width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
                        height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
                    };
                } else {
                    var out = {
                        left: Math.round(colWidth * x + (x + 1) * this.margin[0]),
                        top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
                        // 0 * Infinity === NaN, which causes problems with resize constriants;
                        // Fix this if it occurs.
                        // Note we do it here rather than later because Math.round(Infinity) causes deopt
                        width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
                        height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
                    };
                }


                return out;
            },
            /**
             * Translate x and y coordinates from pixels to grid units.
             * @param  {Number} top  Top position (relative to parent) in pixels.
             * @param  {Number} left Left position (relative to parent) in pixels.
             * @return {Object} x and y in grid units.
             */
            // TODO check if this function needs change in order to support rtl.
            calcXY(top, left) {
                const colWidth = this.calcColWidth();

                // left = colWidth * x + margin * (x + 1)
                // l = cx + m(x+1)
                // l = cx + mx + m
                // l - m = cx + mx
                // l - m = x(c + m)
                // (l - m) / (c + m) = x
                // x = (left - margin) / (coldWidth + margin)
                let x = Math.round((left - this.margin[0]) / (colWidth + this.margin[0]));
                let y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1]));

                // Capping
                x = Math.max(Math.min(x, this.cols - this.w), 0);
                y = Math.max(Math.min(y, this.maxRows - this.h), 0);

                return {x, y};
            },
            // Helper for generating column width
            calcColWidth() {
                var colWidth = (this.containerWidth - (this.margin[0] * (this.cols + 1))) / this.cols;
//                console.log("### COLS=" + this.cols + " COL WIDTH=" + colWidth);
                return colWidth;
            },

            /**
             * Given a height and width in pixel values, calculate grid units.
             * @param  {Number} height Height in pixels.
             * @param  {Number} width  Width in pixels.
             * @return {Object} w, h as grid units.
             */
            calcWH(height, width) {
                const colWidth = this.calcColWidth();

                // width = colWidth * w - (margin * (w - 1))
                // ...
                // w = (width + margin) / (colWidth + margin)
                let w = Math.round((width + this.margin[0]) / (colWidth + this.margin[0]));
                let h = Math.round((height + this.margin[1]) / (this.rowHeight + this.margin[1]));

                // Capping
                w = Math.max(Math.min(w, this.cols - this.x), 0);
                h = Math.max(Math.min(h, this.maxRows - this.y), 0);
                return {w, h};
            },
            updateWidth: function (width, colNum) {
                this.containerWidth = width;
                if (colNum !== undefined && colNum !== null) {
                    this.cols = colNum;
                }
            },
            onUpdateWidth: function() {
                this.$emit("update", this.width);
            },
            compact: function () {
                this.createStyle();
            }
        },
        
    }
</script>
