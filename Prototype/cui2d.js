/**
 * @file cui2d is a light-weight collection of JavaScript functions for creating 
 * graphical user interfaces in an HTML5 canvas 2d context.
 * Examples are available in the wikibook "Canvas 2D Web Apps" 
 * ({@link http://en.wikibooks.org/wiki/Canvas_2D_Web_Apps}).
 * Comments are formatted for JSDoc 3 (see {@link http://usejsdoc.org}).
 * The version number specifies major version, last digit of year, month and day. Quicklinks:
 * <ul><li><b>globals:</b> 
 *   <ul><li>methods: {@link cuiInit}, {@link cuiRepaint}, 
 *     {@link cuiPlayTransition}, {@link cuiIsInsideRectangle},  {@link cuiFillMultiLineText} 
 *   <li>members: {@link cuiCurrentPage}, {@link cuiContext}, {@link cuiCanvas}, 
 *     {@link cuiBackgroundFillStyle}, {@link cuiDefaultFillStyle}, {@link cuiDefaultFont}, 
 *     {@link cuiDefaultTextAlign}, {@link cuiDefaultTextBaseline}, {@link cuiIgnoringEventsEnd},
 *     {@link cuiAnimationStep}, {@link cuiAnimationsArePlaying}, {@link cuiTimeUntilHold}
 *   </ul>  
 * <li><b>{@link cuiPage} class:</b> 
 *   <ul><li>methods: {@link cuiPage.process|process}, {@link cuiPage#processOverlay|processOverlay}, 
 *     {@link cuiPage#transformPageToTransitionCoordinates|transformPageToTransitionCoordinates},
 *     {@link cuiPage#computeTranslationToCenterPoint|computeTranslationToCenterPoint} 
 *   <li>members: {@link cuiPage.width|width}, {@link cuiPage.height|height}, 
 *     {@link cuiPage.interactionBits|interactionBits}, 
 *     {@link cuiPage.isAdjustingWidth|isAdjustingWidth}, 
 *     {@link cuiPage.isAdjustingHeight|isAdjustingHeight}, 
 *     {@link cuiPage.horizontalAlignment|horizontalAlignment}, 
 *     {@link cuiPage.verticalAlignment|verticalAlignment}, {@link cuiPage.view|view}   
 *    </ul> 
 * <li><b>{@link cuiConstants} class:</b> 
 *   <ul><li>members: {@link cuiConstants.none|none}, 
 *     {@link cuiConstants.isDraggableWithOneFinger|isDraggableWithOneFinger},
 *     {@link cuiConstants.isDraggableWithTwoFingers|isDraggableWithTwoFingers}, 
 *     {@link cuiConstants.isRotatableWithTwoFingers|isRotatableWithTwoFingers}, 
 *     {@link cuiConstants.isUniformlyScalableWithTwoFingers|isUniformlyScalableWithTwoFingers}, 
 *     {@link cuiConstants.isTransformableWithTwoFingers|isTransformableWithTwoFingers}, 
 *     {@link cuiConstants.isDraggableWithThreeFingers|isDraggableWithThreeFingers}, 
 *     {@link cuiConstants.isRotatableWithThreeFingers|isRotatableWithThreeFingers}, 
 *     {@link cuiConstants.isUniformlyScalableWithThreeFingers|isUniformlyScalableWithThreeFingers}, 
 *     {@link cuiConstants.isNonUniformlyScalableWithThreeFingers|isNonUniformlyScalableWithThreeFingers}, 
 *     {@link cuiConstants.isShearableWithThreeFingers|isShearableWithThreeFingers}, 
 *     {@link cuiConstants.isDeformableWithThreeFingers|isDeformableWithThreeFingers}, 
 *     {@link cuiConstants.isLimitedToHorizontalDragging|isLimitedToHorizontalDragging}, 
 *     {@link cuiConstants.isLimitedToVerticalDragging|isLimitedToVerticalDragging} 
 *    </ul> 
 * <li><b>{@link cuiButton} class: </b>
 *   <ul><li>methods: {@link cuiButton#process|process}, {@link cuiButton#isClicked|isClicked}, 
 *     {@link cuiButton#isDoubleClicked|isDoubleClicked}, {@link cuiButton#isHeldDown|isHeldDown}  
 *   <li>members: {@link cuiButton.isPointerDown|isPointerDown}, {@link cuiButton.isPointerInside|isPointerInside}
 *   </ul>
 * <li><b>{@link cuiDraggable} class:</b> 
 *    <ul><li>methods: {@link cuiDraggable#process|process}, {@link cuiDraggable#isClicked|isClicked}, 
 *      {@link cuiDraggable#isDoubleClicked|isDoubleClicked}, {@link cuiDraggable#isHeldDown|isHeldDown}
 *    <li>members: {@link cuiDraggable.translationX|translationX}, {@link cuiDraggable.translationY|translationY},
 *      {@link cuiDraggable.isPointerDown|isPointerDown}, {@link cuiDraggable.isPointerInside|isPointerInside}
 *    </ul>
 * <li><b>{@link cuiTransformable} class: </b>
 *    <ul><li>methods: {@link cuiTransformable#process|process}, 
 *      {@link cuiTransformable#isClicked|isClicked}, {@link cuiTransformable#isDoubleClicked|isDoubleClicked},
 *      {@link cuiTransformable#isHeldDown0|isHeldDown0}, {@link cuiTransformable#isHeldDown1|isHeldDown1}  
 *    <li>members: {@link cuiTransformable.translationX|translationX}, {@link cuiTransformable.translationY|translationY}, 
 *      {@link cuiTransformable.rotation|rotation}, {@link cuiTransformable.scale|scale}, 
 *      {@link cuiTransformable.isPointerDown0|isPointerDown0}, {@link cuiTransformable.isPointerDown1|isPointerDown1}, 
 *      {@link cuiTransformable.isPointerInside0|isPointerInside0}, 
 *      {@link cuiTransformable.isProcessingOuterEvents|isProcessingOuterEvents}  
 *    </ul>
 * <li><b>{@link cuiAnimation} class: </b>
 *    <ul><li>methods: {@link cuiAnimation#play|play}, {@link cuiAnimation#animateValues|animateValues}, 
 *      {@link cuiAnimation#isPlaying|isPlaying}, {@link cuiAnimation#stopLooping|stopLooping} 
 *    </ul>
 * <li><b>{@link cuiKeyframe} class:</b>
 *    <ul><li>members: {@link cuiKeyframe.time|time}, {@link cuiKeyframe.in|in}, {@link cuiKeyframe.out|out}, 
 *      {@link cuiKeyframe.values|values} 
 *    </ul> 
 * </ul>
 * @version 0.40312
 * @license public domain 
 * @author Martin Kraus <martin@create.aau.dk>
 */

/** 
 * The canvas element. Set by {@link cuiInit}. 
 * @type {Object}
 */
var cuiCanvas;

/** 
 * The 2d context of the canvas element. Set by {@link cuiInit}. 
 * @type {Object}
 */
var cuiContext;

/** 
 * Currently displayed page. Can be set to change the page. 
 * @see cuiIgnoringEventsEnd
 * @type {cuiPage}
 */
var cuiCurrentPage;

/** 
 * Time (in milliseconds after January 1, 1970) when events are no longer ignored. 
 * Typically set to "(new Date()).getTime() + x" 
 * where "x" is the number of milliseconds that events are being ignored. 
 * (This is useful after changing {@link cuiCurrentPage}.) 
 * @type {number}
 */
var cuiIgnoringEventsEnd; 

/** 
 * Minimum time between frames in milliseconds. 
 * @type {number}
 */
var cuiAnimationStep = 15; 

/** 
 * Flag indicating whether any animation is playing. Set by {@link cuiAnimation#play}. 
 * @type {boolean}
 */
var cuiAnimationsArePlaying; 

var karstendonecallback;
/**
 * Time in milliseconds that a pointer has to be held down until a hold event is triggered. 
 * @see cuiButton#isHeldDown
 * @see cuiDraggable#isHeldDown
 * @see cuiTransformable#isHeldDown0
 * @see cuiTransformable#isHeldDown1
 */
var cuiTimeUntilHold = 500;

/** 
 * Background color (behind all pages). 
 * @type {string}
 */
var cuiBackgroundFillStyle = "#000000";

/** 
 * Default font for all pages.
 * @type {string}
 */
var cuiDefaultFont = "bold 20px Helvetica, sans-serif";

/** 
 * Default horizontal text alignment for all pages.
 * @type {string}
 */
var cuiDefaultTextAlign = "center";

/** 
 * Default vertical text alignment for all pages.
 * @type {string}
 */
var cuiDefaultTextBaseline = "middle";

/** Default fill style (e.g. for text color) for all pages. */
var cuiDefaultFillStyle = "#000000";

// Boolean flag for requesting a repaint of the canvas. Set by cuiRepaint; cleared by cuiProcess. 
var cuiCanvasNeedsRepaint;

// Time (in milliseconds after January 1, 1970) when the last animation should stop. 
// Set by cuiAnimation.play.
var cuiAnimationsEnd; 

// The cuiAnimation for all transition effects. Set by cuiInit.
var cuiAnimationForTransitions;  

// The cuiPage for all transition effects. Set by cuiInit.
var cuiPageForTransitions; 

/** 
 * Initialize cui2d. 
 * @param {cuiPage} startPage - The page to display first.
 */
function cuiInit(startPage) { 
  //  IE-specific polyfill which enables the passage of arbitrary arguments to the
  //  callback functions of javascript timers (HTML5 standard syntax).
  //  https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
  //
  if (document.all && !window.setTimeout.isPolyfill) {
    var __nativeST__ = window.setTimeout;
    window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
      var aArgs = Array.prototype.slice.call(arguments, 2);
      return __nativeST__(vCallback instanceof Function ? function () {
        vCallback.apply(null, aArgs);
      } : vCallback, nDelay);
    };
    window.setTimeout.isPolyfill = true;
  }
  
  // actual initialization
  cuiCanvas = document.getElementsByTagName("canvas")[0];
//  document.body.appendChild(cuiCanvas);

  window.addEventListener("resize", cuiResize);
  window.addEventListener("click", cuiIgnoreEvent);
  window.addEventListener("gesturestart", cuiIgnoreEvent);
  window.addEventListener("gesturechange", cuiIgnoreEvent);
  window.addEventListener("gestureend", cuiIgnoreEvent); 
  //window.addEventListener("mousedown", cuiMouse);
  //window.addEventListener("mouseup", cuiMouse);
  //window.addEventListener("mousemove", cuiMouse);
//  window.addEventListener("mousewheel", cuiMouse);
 // window.addEventListener("wheel", cuiMouse);
//  window.addEventListener("dblclick", cuiMouse);
	window.addEventListener("touchstart", cuiTouch);
 // window.addEventListener("touchmove", cuiTouch);
	window.addEventListener("touchcancel", cuiTouch);
 // window.addEventListener("touchend", cuiTouch);

  // initialize globals
  cuiContext = cuiCanvas.getContext("2d");
  cuiCurrentPage = startPage;
  cuiIgnoringEventsEnd = 0;
  cuiAnimationsEnd = 0;
  cuiAnimationsArePlaying = false;
  if (undefined == cuiAnimationStep || 0 >= cuiAnimationStep) {
    animationStep = 15;
  }

  // initialize transitions
  cuiAnimationForTransitions = new cuiAnimation();
  cuiAnimationForTransitions.previousCanvas = null;
  cuiAnimationForTransitions.nextCanvas = null;
  cuiAnimationForTransitions.nextPage = "";
  cuiAnimationForTransitions.isPreviousOverNext = false;
  cuiAnimationForTransitions.isFrontMaskAnimated = false;
  cuiPageForTransitions = new cuiPage();
  cuiPageForTransitions.process = function(event) {
    if (null == event) {
      cuiDrawTransition();
    }
    return false;
  }
  cuiRepaint();
  cuiRenderLoop();
}   

// Resize handler. Used by cuiInit.
function cuiResize() {
  cuiRepaint();
}

// Event handler for ignoring events. Used by cuiInit.
function cuiIgnoreEvent(event) { 
  event.preventDefault(); 
}

// Event handler for mouse events. Used by cuiInit.
function cuiMouse(event) {
//  event.preventDefault(); 
  cuiProcess(event); 
}

// Event handler for touch events. Used by cuiInit.
function cuiTouch(event) {
  event.preventDefault();

  // process all changed touches for the current event individually
  var touches = event.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    event.clientX = touches[i].clientX;
    event.clientY = touches[i].clientY;
    event.identifier = touches[i].identifier;
    cuiProcess(event); 
  }
}

// Send an internal event to check for a mouse or touch hold condition. 
function cuiSendHoldEvent(x, y, id, time) {
  var event = { clientX : x, clientY : y, identifier : id, type : "mousehold", timeDown : time };
  cuiProcess(event);
}

/** Request to repaint the canvas (usually because some state change requires it). */
function cuiRepaint() {
  cuiCanvasNeedsRepaint = true; // is checked by cuiRenderLoop() and cleared by cuiProcess(null)
}

// Render loop of cui2d, which calls cuiProcess(null) if needed. 
function cuiRenderLoop() {
  var now = (new Date()).getTime();
  if (cuiAnimationsEnd < now ) { // all animations over?
    if (cuiAnimationsArePlaying) {  
      cuiRepaint();
      // repaint one more time since the rendering might differ
      // after the animations have stopped
    }
    cuiAnimationsArePlaying = false;
	if(karstendonecallback){
		var hack = karstendonecallback;
		karstendonecallback= null;
		hack();
	}
	
  }
  else {
    cuiAnimationsArePlaying = true;
  }

  if (cuiCanvasNeedsRepaint || cuiAnimationsArePlaying) {
    cuiProcess(null);
  }
  window.setTimeout("cuiRenderLoop()", cuiAnimationStep); // call myself again
    // using setTimeout allows to easily change cuiAnimationStep dynamically
}

// Either process the event (if event != null) or repaint the current page specified by cuiCurrentPage (if event == null). 
// (Is called by cuiRenderLoop.)
function cuiProcess(event) {
  // ignore events if necessary
  if (null != event && cuiIgnoringEventsEnd > 0) {
    if ((new Date()).getTime() < cuiIgnoringEventsEnd) {
      return;
    }
  }

  // clear repaint flag
  if (null == event) {
    cuiCanvasNeedsRepaint = false;
  }

  var transform = {scale : 1.0, x : 0.0, y : 0.0};
  cuiCurrentPage.computeInitialTransformation(transform);
  cuiCurrentPage.computeEventCoordinates(event, transform);

  // initialize drawing
  if (null == event) {
    cuiCanvas.width = window.innerWidth;
    cuiCanvas.height = window.innerHeight;
      // The following line is not necessary because we set the canvas size: 
      //   cuiContext.clearRect(0, 0, cuiCanvas.width, cuiCanvas.height);
      // Some people recommend to avoid setting the canvas size every frame, 
      // but I had trouble with rendering a transition effect on Firefox without it.

    cuiCurrentPage.setPageTransformation(transform);
    cuiContext.globalCompositeOperation = "destination-over";
    cuiContext.globalAlpha = 1.0;
    cuiContext.font = cuiDefaultFont;
    cuiContext.textAlign = cuiDefaultTextAlign;
    cuiContext.textBaseline = cuiDefaultTextBaseline;
    cuiContext.fillStyle = cuiDefaultFillStyle;
  }

  if (!cuiCurrentPage.process(event) && cuiCurrentPage != cuiPageForTransitions && null != event) { 
    // event hasn't been processed, not a transition, and we have an event?
    event.eventX = event.clientX; // we don't need any transformation here because the initial ...
    event.eventY = event.clientY; // ... transformation is applied to the arguments of ... 
      // ... view.process() and the transformation in view is applied internally in view.process()
    
    var oldTranslationX = cuiCurrentPage.view.translationX;
    var oldTranslationY = cuiCurrentPage.view.translationY;

    if (cuiCurrentPage.view.process(event, transform.x, transform.y, cuiCurrentPage.width * transform.scale, 
      cuiCurrentPage.height * transform.scale, null, null, null, null, null, cuiCurrentPage.interactionBits)) {
      // enforce dragging constraints with page
      if (cuiCurrentPage.interactionBits & cuiConstants.isLimitedToVerticalDragging) {
        cuiCurrentPage.view.translationX = oldTranslationX;
      }
      if (cuiCurrentPage.interactionBits & cuiConstants.isLimitedToHorizontalDragging) {
        cuiCurrentPage.view.translationY = oldTranslationY;
      }
    }
  }

  // draw background behind page
  if (null == event) {
    cuiContext.globalCompositeOperation = "destination-over";
    cuiContext.globalAlpha = 1.0;
    cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
    cuiContext.fillStyle = cuiBackgroundFillStyle;
    cuiContext.fillRect(0, 0, cuiCanvas.width, cuiCanvas.height);
  }
}

/**
 * Write multi-line text where a new line is started with a newline character and a carriage return 
 * character draws the following line over the previous.
 * @param {string} text - The multi-line text.
 * @param {number} x - The x coordinate for all lines.
 * @param {number} y - The y coordinate for the first line. Further lines use y + n * baselineSkip.
 * @param {number} maxWidth - The maximum width of all lines. (If a line is too wide, it is scaled.)
 * @param {number} maxHeight - The maximum height. Lines at y coordinates larger than 
 * maxHeight - baselineSkip are clipped.
 * @param {number} baselineSkip - The increment between y coordinates of successive lines.
 */
function cuiFillMultiLineText(text, x, y, maxWidth, maxHeight, baselineSkip) {
  var indexLineBreak = -1;
  var lineString;
  var indexNextLineBreak;
  var indexNextNewLine;
  var indexNextReturn;
  do {
    indexNextNewLine = text.indexOf('\n', indexLineBreak + 1);
    indexNextReturn = text.indexOf('\r', indexLineBreak + 1);
    if (indexNextNewLine >= 0 && (indexNextReturn < 0 || indexNextNewLine < indexNextReturn)) {
       indexNextLineBreak = indexNextNewLine;
    }
    else {
       indexNextLineBreak = indexNextReturn;
    }
    if (indexNextLineBreak >= 0) {
      lineString = text.substring(indexLineBreak + 1, indexNextLineBreak);
    }
    else {
      lineString = text.substring(indexLineBreak + 1);
    }
    cuiContext.fillText(lineString, x, y, maxWidth);
    if (indexNextNewLine == indexNextLineBreak) {
      y = y + baselineSkip;
    }
    indexLineBreak = indexNextLineBreak;
  } while (indexLineBreak >= 0 && y + baselineSkip < maxHeight); 
}

/** 
 * Either determine whether the event's position is inside a rectangle (if event != null) 
 * or draw an image in the rectangle with a text string on top of it (if event == null).
 * @param {Object} event - An object describing a user event by its "type", coordinates in 
 * page coordinates ("eventX" and "eventY"), an "identifier" for touch events, and optionally
 * "buttons" to specify which mouse buttons are depressed. If null, the function should
 * redraw the button.
 * @param {number} x - The x coordinate of the top, left corner of the rectangle.
 * @param {number} y - The y coordinate of the top, left corner of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {string} text - A text that is written at the center of the rectangle. (May be null).
 * @param {Object} image - An image to be drawn inside the rectangle. (May be null.)
 * @returns {boolean} True if event != null and the coordinates of the event are
 * inside the rectangle, false otherwise.
 */ 
function cuiIsInsideRectangle(event, x, y, width, height, text, image) {
  if (null == event) { // draw button
    if (null != text) {
      cuiContext.fillText(text, x + width / 2, y + height / 2);
    }
    if (null != image) {
      cuiContext.drawImage(image, x, y, width, height);
    } 
    return false;
  }
  else { // if (null != event) 
    if (event.eventX >= x && event.eventX < x + width &&
      event.eventY >= y && event.eventY < y + height) {
      return true;
    }
    return false;
  }
} 


/** 
 * @class cuiConstants
 * @classdesc This class is a collection of constants used in cui2d.
 */
function cuiConstants() {
} 

/** Constant for 0, e.g. no bits. */
cuiConstants.none = 0;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isDraggableWithOneFinger = 1; 

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isDraggableWithTwoFingers = 2;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isRotatableWithTwoFingers = 4;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isUniformlyScalableWithTwoFingers = 8;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isTransformableWithTwoFingers = 2 + 4 + 8;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isDraggableWithThreeFingers = 16;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isRotatableWithThreeFingers = 32;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isUniformlyScalableWithThreeFingers = 64; 

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isNonUniformlyScalableWithThreeFingers = 128;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isShearableWithThreeFingers = 256;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isDeformableWithThreeFingers = 16 + 32 + 64 + 129 + 256;

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isLimitedToHorizontalDragging = 512; 

/** Bit constant to specify a specific form of interaction. */
cuiConstants.isLimitedToVerticalDragging = 1024;

/**
 * @class cuiPage
 * @classdesc Pages are the top-level structure of a cui2d user interface. 
 * There is always exactly one (proper) page visible but the {@link cuiPage.process} function  
 * of that page might include multiple overlay pages with {@link cuiPage#processOverlay}.
 * {@link cuiPage.process} usually calls other process functions (e.g. {@link cuiButton#process},
 * {@link cuiDraggable#process}, {@link cuiTransformable#process}) to include GUI elements in
 * the layout of a page. 
 * Each page has a coordinate system with the origin in the top, left corner and 
 * x coordinates between 0 and width, and y coordinates between 0 and height. 
 *
 * @desc Create a new cuiPage of specified width and height with the specified process function.
 * @param {number} width - The width of the page.
 * @param {number} height - The height of the page.
 * @param {function} process - The page's process function to process an event 
 * (with process(event) which should return true to indicate that the event has
 * been processed and therefore to prevent the default gestures for manipulating 
 * pages) and to repaint the page (with process(null) which should always return 
 * false).
 */
function cuiPage(width, height, process) {
  /**
   * The width of the page.
   * @member {number} cuiPage.width
   */
  this.width = width;
  /**
   * The height of the page.
   * @member {number} cuiPage.height
   */
  this.height = height;
  /**
   * The page's process function to process an event 
   * (with process(event) which should return true to indicate that the event has
   * been processed and therefore to prevent the default gestures for manipulating 
   * pages) and to repaint the page (with process(null) which should always return 
   * false).
   * @member {function} cuiPage.process
   */
  this.process = process;
  /** 
   * Flag to specify whether to adjust the width of the page by scaling.
   * (By default set to true.)
   * @member {boolean} cuiPage.isAdjustingWidth
   */
  this.isAdjustingWidth = false;
  /** 
   * Flag to specify whether to adjust the height of the page by scaling.
   * (By default set to true.)
   * @member {boolean} cuiPage.isAdjustingHeight
   */
  this.isAdjustingHeight = false; 
  /** 
   * Number to specify the horizontal alignment: -1 for left, 0 for center, +1 for right.
   * (By default set to 0.)
   * @member {number} cuiPage.horizontalAlignment 
   */
  this.horizontalAlignment = 0;
  /** 
   * Number to specify the vertical alignment: -1 for top, 0 for center, +1 for bottom.
   * (By default set to 0.)
   * @member {number} cuiPage.verticalAlignment 
   */
  this.verticalAlignment = 0;
  /** 
   * Bits to specify the available forms of default interaction with a page. 
   * Either {@link cuiConstants.none} or a bitwise-or of other constants in {@link cuiConstants}, e.g. 
   * cuiConstants.isDraggableWithOneFinger | cuiConstants.isTransformableWithTwoFingers.
   * @member {number} cuiPage.interactionBits 
   */   
  this.interactionBits = (cuiConstants.isDraggableWithOneFinger | cuiConstants.isTransformableWithTwoFingers);
  
  /** 
   * The transformable object representing the page's transformation relative to the initial transformation.
   * This transformable object usually has its {@link cuiTransformable.isProcessingOuterEvents} property 
   * set to true.
   * @member {cuiTransformable} cuiPage.view
   */   
  this.view = new cuiTransformable(); 
  this.view.isProcessingOuterEvents = true; // consume events even if outside rectangle
}


// Compute the initial transformation from page coordinates to window coordinates.
// parameter transform - The result is written to this object, which should
// have scale, x and y properties representing a transformation consisting of a 
// scaling and a translation.
cuiPage.prototype.computeInitialTransformation = function(transform) {
  if ((this.isAdjustingWidth && this.isAdjustingHeight &&
    window.innerWidth / this.width < window.innerHeight / this.height) ||
    (this.isAdjustingWidth && !this.isAdjustingHeight)) {
    // required X scaling is smaller: use it
    transform.scale = window.innerWidth / this.width;
    transform.x = 0.0; // X is scaled for full window
    transform.y = 0.5 * (this.verticalAlignment + 1.0) * 
      (window.innerHeight - this.height * transform.scale);
      // scaling is too small for Y: offset to align page
  }
  else if (this.isAdjustingHeight) { // required Y scaling is smaller: use it
    transform.scale = window.innerHeight / this.height;
    transform.x = 0.5 * (this.horizontalAlignment + 1.0) * 
      (window.innerWidth - this.width * transform.scale);
      // scaling is too small for X: offset to align page
    transform.y = 0.0;
  }
  else { // no adjusting of width nor height: just align
    transform.scale = 1.0;
    transform.x = 0.5 * (this.horizontalAlignment + 1.0) * 
      (window.innerWidth - this.width * transform.scale);
    transform.y = 0.5 * (this.horizontalAlignment + 1.0) * 
      (window.innerHeight - this.height * transform.scale);
  }
}

// Compute event coordinates in page coordinates and write them to event.eventX and event.eventY.
// parameter event - The user invent with coordinates clientX and clientY.
// parameter transform - The transformation computed with cuiPage#computeInitialTransformation.
cuiPage.prototype.computeEventCoordinates = function(event, transform) {
  if (null != event) {  
    // transformation in this.view
    var mappedX = event.clientX - this.view.translationX;
    var mappedY = event.clientY - this.view.translationY;
    mappedX = mappedX - transform.x - 0.5 * this.width * transform.scale;
    mappedY = mappedY - transform.y - 0.5 * this.height * transform.scale;
    var angle = -this.view.rotation * Math.PI / 180.0;
    var tempX = Math.cos(angle) * mappedX - Math.sin(angle) * mappedY;
    mappedY = Math.sin(angle) * mappedX  + Math.cos(angle) * mappedY;
    mappedX = tempX / this.view.scale;
    mappedY = mappedY / this.view.scale;
    mappedX = mappedX + transform.x + 0.5 * this.width * transform.scale;
    mappedY = mappedY + transform.y + 0.5 * this.height * transform.scale;
    // initial transformation for fitting the page into the window
    event.eventX = (mappedX - transform.x) / transform.scale;
    event.eventY = (mappedY - transform.y) / transform.scale;
  }
}

// Set the transformation from page coordinates to window coordinates in cuiContext.
// parameter transform - The transformation computed with cuiPage.computeInitialTransformation.
cuiPage.prototype.setPageTransformation = function(transform) {
    // transformation in this.view
    cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
    cuiContext.translate(this.view.translationX, this.view.translationY);
    cuiContext.translate(transform.x + 0.5 * this.width * transform.scale, 
      transform.y + 0.5 * this.height * transform.scale);
    cuiContext.rotate(this.view.rotation * Math.PI / 180.0);
    cuiContext.scale(this.view.scale, this.view.scale);
    cuiContext.translate(-transform.x - 0.5 * this.width * transform.scale, 
      -transform.y - 0.5 * this.height * transform.scale);
    // initial transformation for fitting the page into the window
    cuiContext.translate(transform.x, transform.y);
    cuiContext.scale(transform.scale, transform.scale);
}

/**
 * Transforms the coordinates point.x and point.y from page coordinates to 
 * the transition coordinate system (with coordinates between -1 and +1).
 * @see cuiPlayTransition
 * @param {Object} point - An object with an x and y property representing a 2D point.
 */
cuiPage.prototype.transformPageToTransitionCoordinates = function(point) {
  var transform = {scale : 1.0, x : 0.0, y : 0.0};
  this.computeInitialTransformation(transform);

  // initial transformation for fitting the page into the window
  var x = point.x * transform.scale + transform.x; 
  var y = point.y * transform.scale + transform.y;
  
  // transformation in this.view
  x = (x - transform.x - 0.5 * this.width * transform.scale) * this.view.scale; 
  y = (y - transform.y - 0.5 * this.height * transform.scale) * this.view.scale;
  var angle = this.view.rotation * Math.PI / 180.0;
  var tempX = Math.cos(angle) * x - Math.sin(angle) * y;
  y = Math.sin(angle) * x  + Math.cos(angle) * y;
  x = tempX + transform.x + 0.5 * this.width * transform.scale + this.view.translationX; 
  y = y + transform.y + 0.5 * this.height * transform.scale + this.view.translationY;

  // transformation from window coordinates to transition coordinates
  point.x = 2.0 * x / window.innerWidth - 1.0;
  point.y = 2.0 * y / window.innerHeight - 1.0;
}

/** 
 * Compute the values for {@link cuiTransformable.translationX} and 
 * {@link cuiTransformable.translationY} of {@link cuiPage.view}
 * to center the point (point.x, point.y) on the screen and 
 * write these values to point.x and point.y.
 * @param {Object} point - An object with an x and y property representing a 2D point.
 */ 
cuiPage.prototype.computeTranslationToCenterPoint = function(point) {
  var transform = {scale : 1.0, x : 0.0, y : 0.0};
  this.computeInitialTransformation(transform);
  
  // compute where point (in page coordinates) is mapped to in window coordinates
  // with the current transformation
  var mappedX = point.x * transform.scale + transform.x;
  var mappedY = point.y * transform.scale + transform.y;
  mappedX = mappedX - transform.x - 0.5 * this.width * transform.scale;
  mappedY = mappedY - transform.y - 0.5 * this.height * transform.scale;
  mappedX = mappedX * this.view.scale;
  mappedY = mappedY * this.view.scale;
  var angle = this.view.rotation * Math.PI / 180.0;
  var tempX = Math.cos(angle) * mappedX - Math.sin(angle) * mappedY;
  mappedY = Math.sin(angle) * mappedX  + Math.cos(angle) * mappedY;
  mappedX = tempX + transform.x + 0.5 * this.width * transform.scale;
  mappedY = mappedY + transform.y + 0.5 * this.height * transform.scale;
  mappedX = mappedX + this.view.translationX;
  mappedY = mappedY + this.view.translationY;
  
  // (x,y) should be mapped to (0.5 * window.innerWidth, 0.5 * window.innerHeight)
  // we compute the require translation such that it ends up there
  point.x = this.view.translationX + 0.5 * window.innerWidth - mappedX;
  point.y = this.view.translationY + 0.5 * window.innerHeight - mappedY;
}

/** 
 * Either process the event (if event != null) and return true if the event has been processed, 
 * or draw the page as an overlay (to another page) in the rectangle, which is specified in 
 * window coordinates (if event == null) and return false. This function is usually called
 * by {@link cuiPage.process} of another page.
 * @param {Object} event - An object describing a user event by its "type", coordinates in 
 * window coordinates ("clientX" and "clientY"), an "identifier" for touch events, and optionally
 * "buttons" to specify which mouse buttons are depressed. If null, the function should
 * redraw the overlay page. 
 * @returns {boolean} True if event != null and the event has been processed (implying that 
 * no other GUI elements should process it). False otherwise.
 */ 
cuiPage.prototype.processOverlay = function(event) {
  var orgEvent = event;

  var transform = {scale : 1.0, x : 0.0, y : 0.0};
  this.computeInitialTransformation(transform);

  if (null != orgEvent) {
    event = {clientX : orgEvent.clientX, clientY : orgEvent.clientY, 
      eventX : orgEvent.eventX, eventY : orgEvent.eventY,
      type : orgEvent.type, buttons : orgEvent.buttons, 
      deltaY : orgEvent.deltaY, wheelDelta : orgEvent.wheelDelta};
    this.computeEventCoordinates(event, transform); // set event coordinates for our transformation
  }
  if (null == orgEvent) {
    cuiContext.save();
    this.setPageTransformation(transform); // set our transformation in cuiContext
  }
  var flag = this.process(event); // call our process function
  
  if (!flag && null != event && (this.interactionBits != cuiConstants.none)) { 
    // event hasn't been processed and we have an event?
    event.eventX = event.clientX; // we don't need any transformation here because the initial ...
    event.eventY = event.clientY; // ... transformation is applied to the arguments of ... 
      // ... view.process() and the transformation in view is applied internally in view.process()
    
    var oldTranslationX = this.view.translationX;
    var oldTranslationY = this.view.translationY;
    var oldFlag = this.view.isProcessingOuterEvents;
    this.view.isProcessingOuterEvents = false; // don't let a page process outer events if it is an overlay

    if (this.view.process(event, transform.x, transform.y, this.width * transform.scale, 
      this.height * transform.scale,
      null, null, null, null, null, this.interactionBits)) {
      flag = true;
      // enforce interaction constraints with page
      if (cuiConstants.isLimitedToVerticalDragging & this.interactionBits) {
        this.view.translationX = oldTranslationX;
      }
      if (cuiConstants.isLimitedToHorizontalDragging & this.interactionBits) {
        this.view.translationY = oldTranslationY;
      }
    }
    this.view.isProcessingOuterEvents = oldFlag; // restore page's setting
  }

  if (null == orgEvent) { 
    cuiContext.restore();
  }
  return flag;
}

/**
 * @class cuiButton
 * @classdesc Buttons are clickable rectangular regions.
 *
 * @desc Create a new cuiButton.
 */
function cuiButton() {
  /** 
   * Flag specifying whether a mouse button or finger is inside the button's rectangle.
   * @member {boolean} cuiButton.isPointerInside
   */
  this.isPointerInside = false; 
  /** 
   * Flag specifying whether a mouse button or finger is pushing the button or has been
   * pushing the button and is still held down (but may have moved outside the button's    
   * rectangle). 
   * @member {boolean} cuiButton.isPointerDown 
   */
  this.isPointerDown = false; 
  this.identifier = -1; // the identifier of the touch point
  this.hasTriggeredClick = false; // click event has been triggered?
  this.hasTriggeredDoubleClick = false; // double click event has been triggered?
  this.hasTriggeredHold = false; // hold event has been triggered?
}

/** 
 * Determine whether the button has just been clicked. 
 * @returns {boolean} True if the button has been clicked, false otherwise.
 */
cuiButton.prototype.isClicked = function() {
  return this.hasTriggeredClick;
}

/** 
 * Determine whether the button has just been double clicked. 
 * @returns {boolean} True if the button has been double clicked, false otherwise.
 */
cuiButton.prototype.isDoubleClicked = function() {
  return this.hasTriggeredDoubleClick;
}

/** 
 * Determine whether the button has just been held longer than {@link cuiTimeUntilHold}. 
 * @returns {boolean} True if the button has just been held down long enough, false otherwise.
 */
cuiButton.prototype.isHeldDown = function() {
  return this.hasTriggeredHold;
}

/** 
 * Either process the event (if event != null) and return true if the event has been processed, 
 * or draw the appropriate image for the button state in the rectangle 
 * with a text string on top of it (if event == null) and return false.
 * This function is usually called by {@link cuiPage.process} of a {@link cuiPage}.
 * @param {Object} event - An object describing a user event by its "type", coordinates in 
 * page coordinates ("eventX" and "eventY"), an "identifier" for touch events, and optionally
 * "buttons" to specify which mouse buttons are depressed. If null, the function should
 * redraw the button.
 * @param {number} x - The x coordinate of the top, left corner of the button's rectangle.
 * @param {number} y - The y coordinate of the top, left corner of the button's rectangle.
 * @param {number} width - The width of the button's rectangle.
 * @param {number} height - The height of the button's rectangle.
 * @param {string} text - A text that is written at the center of the rectangle. (May be null).
 * @param {Object} imageNormal - An image to be drawn inside the button's rectangle if there
 * are no user interactions. (May be null.)
 * @param {Object} imageFocused - An image to be drawn inside the button's rectangle if the
 * mouse hovers over the button's rectangle or a touch point moves into it. (May be null.)
 * @param {Object} imagePressed - An image to be drawn inside the button's rectangle if a
 * mouse button is pushed or the button is touched. (May be null.)
 * @returns {boolean} True if event != null and the event has been processed (implying that 
 * no other GUI elements should process it). False otherwise.
 */ 
cuiButton.prototype.process = function(event, x, y, width, height, 
  text, imageNormal, imageFocused, imagePressed) {
  // choose appropriate image
  var image = imageNormal;
  if (this.isPointerDown && this.isPointerInside) {
    image = imagePressed;
  } 
  else if (this.isPointerDown || this.isPointerInside) {
    image = imageFocused;
  }

  // check or repaint button
  var isIn = cuiIsInsideRectangle(event, x, y, width, height, text, image);
    // note that the event might be inside the rectangle (isIn == true) 
    // but the state might still be isPointerDown == false (e.g. for touchend or 
    // touchcancel or if the pointer went down outside of the button)

  // react to event
  if (null == event) {
    return false; // no event to process
  }

  // clear trigger flags (they are set only once after the event and have to be cleared afterwards)
  this.hasTriggeredClick = false;
  this.hasTriggeredDoubleClick = false;
  this.hasTriggeredHold = false;

  // process double click events
  if ("dblclick" == event.type) {
    this.hasTriggeredDoubleClick = isIn;
    return isIn;
  }
  
  // process our hold events
  if ("mousehold" == event.type) {
    if (event.timeDown == this.timeDown && event.identifier == this.identifier && 
      this.isPointerInside && this.isPointerDown) {
      this.hasTriggeredHold = true;
      return true;
    }
    return false;
  }
  
  // process wheel events
  if ("wheel" == event.type || "mousewheel" == event.type) {
    return isIn; // give directly to caller
  }

  // ignore mouse or touch points that are not the tracked point (apart from mousedown and touchstart)
  if (this.isPointerInside || this.isPointerDown) {
    if ("touchend" == event.type || "touchmove" == event.type || "touchcancel" == event.type) {
      if (event.identifier != this.identifier) {
        return false; // ignore all other touch points except "touchstart" events
      }
    }
    else if (("mousemove" == event.type || "mouseup" == event.type) && event.identifier >= 0) {
      return false; // ignore mouse (except mousedown) if we are tracking a touch point
    }
  }
 
  // state changes
  if (!this.isPointerInside && !this.isPointerDown) { // passive button state
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) {
      this.isPointerDown = true;
      this.isPointerInside = true;
      if ("touchstart" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse 
      }    
      this.timeDown = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier, this.timeDown); 
      cuiRepaint();
      return true;
    }
    else if (isIn && ("mousemove" == event.type || "mouseup" == event.type || 
      "touchmove" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = true;
      if ("touchmove" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse 
      }    
      cuiRepaint();
      return true;
    }
    else {
      return false; // none of our business
    }
  }
  else if (this.isPointerInside && !this.isPointerDown) { // focused button state (not pushed yet) 
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) {
      this.isPointerDown = true;
      this.isPointerInside = true;
      if ("touchstart" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse
      }    
      this.timeDown = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier, this.timeDown); 
      cuiRepaint();
      return true;
    }
    else if (isIn && ("touchend" == event.type || "touchcancel" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && ("touchmove" == event.type || "touchend" == event.type || 
      "touchcancel" == event.type || "mousemove" == event.type || "mouseup" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return false; // none of our business
    }
    else {
      return false; // none of our business
    }
  }
  else if (!this.isPointerInside && this.isPointerDown) { // focused button state (pushed previously)
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) {
      this.isPointerDown = true;
      this.isPointerInside = true;
      if ("touchstart" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse
      }    
      this.timeDown = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier, this.timeDown); 
      cuiRepaint();
      return true;
    }
    else if (isIn && ("mouseup" == event.type || ("mousemove" == event.type && 0 == event.buttons))) { 
      this.isPointerDown = false;
      this.isPointerInside = true;
      this.identifier = -1; // mouse
      this.hasTriggeredClick = true;
      cuiRepaint();
      return true; 
    }
    else if (isIn && ("touchend" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      this.hasTriggeredClick = true;
      cuiRepaint();
      return true; 
    }
    else if (isIn && ("touchcancel" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if (isIn && ("touchmove" == event.type || ("mousemove" == event.type))) { 
      this.isPointerInside = true;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && ("mouseup" == event.type || ("mousemove" == event.type && 0 == event.buttons) ||
      "touchend" == event.type || "touchcancel" == event.type)) {
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && (("mousedown" == event.type && this.identifier < 0) ||
      ("touchstart" == event.type && this.identifier == event.identifier))) {
      this.isPointerDown = false;
      this.isPointerInside = false;
      return false; // none of our business
    }
    else if ("touchmove" == event.type || "mousemove" == event.type) { 
      return true; // this is our event, we feel responsible for it
    }
    else {
      return false; // none of our business
    }
  }
  else if (this.isPointerInside && this.isPointerDown) { // depressed button state 
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) {
      this.isPointerDown = true;
      this.isPointerInside = true;
      if ("touchstart" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse 
      }    
      this.timeDown = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier, this.timeDown); 
      cuiRepaint();
      return true;
    }
    else if (isIn && ("mouseup" == event.type || ("mousemove" == event.type && 0 == event.buttons))) { 
      this.isPointerDown = false;
      this.isPointerInside = true;
      this.identifier = -1; // mouse 
      this.hasTriggeredClick = true;
      cuiRepaint();
      return true; 
    }
    else if (isIn && ("touchend" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      this.hasTriggeredClick = true;
      cuiRepaint();
      return true; 
    }
    else if (isIn && ("touchcancel" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && ("mouseup" == event.type || ("mousemove" == event.type && 0 == event.buttons) || 
      "touchend" == event.type || "touchcancel" == event.type)) {
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && ("touchmove" == event.type || ("mousemove" == event.type))) {
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && (("mousedown" == event.type && this.identifier < 0) ||
      ("touchstart" == event.type && this.identifier == event.identifier))) {
      this.isPointerDown = false;
      this.isPointerInside = false;
      return false; // none of our business
    }
    else if ("touchmove" == event.type || "mousemove" == event.type) { 
      return true; // this is our event, we feel responsible for it
    }
    else {
      return false; // none of our business
    }
  }
  // unreachable code
  return false;
}

/**
 * @class cuiDraggable
 * @classdesc Draggables can be translated by dragging.
 *  
 * @desc Create a new cuiDraggable.
 */
function cuiDraggable() {
  /** 
   * Difference in x coordinate by which the centre of the draggable has been moved relative to its
   * initial position (specified by x + 0.5 * width with the arguments of {@link cuiDraggable#process}). 
   * @member {number} cuiDraggable.translationX 
   */
  this.translationX = 0;
  /** 
   * Difference in y coordinate by which the centre of the draggable has been moved relative to its
   * initial position (specified by y + 0.5 * height with the arguments of {@link cuiDraggable#process}). 
   * @member {number} cuiDraggable.translationY 
   */
  this.translationY = 0;
  /** 
   * Flag specifying whether a mouse button or finger is inside the object's rectangle.
   * @member {boolean} cuiDraggable.isPointerInside
   */
  this.isPointerInside = false; 
  /** 
   * Flag specifying whether a mouse button or finger is pushing the object or has been
   * pushing the object and is still held down (but may have moved outside the object's    
   * rectangle). 
   * @member {boolean} cuiDraggable.isPointerDown 
   */
  this.isPointerDown = false;
  this.hasTriggeredClick = false; // click event has been triggered?
  this.hasTriggeredDoubleClick = false; // double click event has been triggered?
  this.hasTriggeredHold = false; // hold event has been triggered?
  this.timeDown = 0; // time in milliseconds after January 1, 1970 when the pointer went down
  this.eventXDown = 0; // x coordinate of the event when the pointer went down 
  this.eventYDown = 0; // y coordinate of the event when the pointer went down
  this.identifier = -1; // identifier of the touch point
  this.translationXDown = 0; // value of translationX when the pointer went down
  this.translationYDown = 0; // value of translationY when the pointer went down
}

/**
 * Determine whether the draggable has just been clicked. 
 * @returns {boolean} True if the draggable has been clicked, false otherwise.
 */
cuiDraggable.prototype.isClicked = function() {
  return this.hasTriggeredClick;
}

/** 
 * Determine whether the draggable has just been double clicked. 
 * @returns {boolean} True if the button has been double clicked, false otherwise.
 */
cuiDraggable.prototype.isDoubleClicked = function() {
  return this.hasTriggeredDoubleClick;
}

/** 
 * Determine whether the pointer has just been held down longer than {@link cuiTimeUntilHold}. 
 * @returns {boolean} True if the pointer has just been held down long enough, false otherwise.
 */
cuiDraggable.prototype.isHeldDown = function() {
  return this.hasTriggeredHold;
}

/** 
 * Either process the event (if event != null) and return true if the event has been processed, 
 * or draw the appropriate image for the object state in the rectangle 
 * with a text string on top of it (if event == null) and return false.
 * This function is usually called by {@link cuiPage.process} of a {@link cuiPage}.
 * @param {Object} event - An object describing a user event by its "type", coordinates in 
 * page coordinates ("eventX" and "eventY"), an "identifier" for touch events, and optionally
 * "buttons" to specify which mouse buttons are depressed. If null, the function should
 * redraw the object.
 * @param {number} x - The x coordinate of the top, left corner of the object's rectangle.
 * @param {number} y - The y coordinate of the top, left corner of the object's rectangle.
 * @param {number} width - The width of the object's rectangle.
 * @param {number} height - The height of the object's rectangle.
 * @param {string} text - A text that is written at the center of the rectangle. (May be null).
 * @param {Object} imageNormal - An image to be drawn inside the object's rectangle if there
 * are no user interactions. (May be null.)
 * @param {Object} imageFocused - An image to be drawn inside the object's rectangle if the
 * mouse hovers over the object's rectangle or a touch point moves into it. (May be null.)
 * @param {Object} imagePressed - An image to be drawn inside the object's rectangle if a
 * mouse button is pushed or the object is touched. (May be null.)
 * @param {number} interactionBits - The forms of interaction, either {@link cuiConstants.none} or a bitwise-or 
 * of other constants in {@link cuiConstants}, e.g. 
 * cuiConstants.isDraggableWithOneFinger | cuiConstants.isLimitedToHorizontalDragging.
 * @returns {boolean} True if event != null and the event has been processed (implying that 
 * no other GUI elements should process it). False otherwise.
 */ 
cuiDraggable.prototype.process = function(event, x, y, width, height, 
  text, imageNormal, imageFocused, imagePressed, interactionBits) {
  // choose appropriate image
  var image = imageNormal;
  if (this.isPointerDown) {
    image = imagePressed;
  } 
  else if (this.isPointerInside) {
    image = imageFocused;
  }

  // check or repaint button
  var isIn = cuiIsInsideRectangle(event, x + this.translationX, y + this.translationY, 
    width, height, text, image);
    // note that the event might be inside the rectangle (isIn == true) 
    // but the state might still be isPointerDown == false (e.g. for touchend or 
    // touchcancel or if the pointer went down outside of the button)

  // react to event
  if (null == event) {
    return false; // no event to process
  }

  // clear trigger events (these are set only once after the event and have to be cleared afterwards)
  this.hasTriggeredClick = false;
  this.hasTriggeredDoubleClick = false;
  this.hasTriggeredHold = false;

  // process double click events
  if ("dblclick" == event.type) {
    this.hasTriggeredDoubleClick = isIn;
    return isIn;
  }

  // process our hold events
  if ("mousehold" == event.type) {
    if (event.timeDown == this.timeDown && event.identifier == this.identifier && 
      this.isPointerDown) {
      this.hasTriggeredHold = true;
      return true;
    }
    return false;
  }
  
  // process other events
  if ("wheel" == event.type || "mousewheel" == event.type) {
    return isIn; // give directly to caller
  }

  // ignore mouse or touch points that are not the tracked point (apart from mousedown and touchstart)
  if (this.isPointerInside || this.isPointerDown) {
    if ("touchend" == event.type || "touchmove" == event.type || "touchcancel" == event.type) {
      if (event.identifier != this.identifier) {
        return false; // ignore all other touch points except "touchstart" events
      }
    }
    else if (("mousemove" == event.type || "mouseup" == event.type) && this.identifier >= 0) {
      return false; // ignore mouse (except mousedown) if we are tracking a touch point
    }
  }

  // state changes
  if (!this.isPointerInside && !this.isPointerDown) { // passive object state
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) {
      this.isPointerDown = true;
      this.isPointerInside = true;
      if ("touchstart" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse 
      }    
      this.timeDown = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier, this.timeDown); 
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.eventXDown = event.eventX;
      this.eventYDown = event.eventY;
      cuiRepaint();
      return true;
    }
    else if (isIn && ("mousemove" == event.type || "mouseup" == event.type || 
      "touchmove" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = true;
      if ("touchmove" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse 
      }    
      cuiRepaint();
      return true;
    }
    else {
      return false; // none of our business
    }
  }
  else if (this.isPointerInside && !this.isPointerDown) { // focused object state (not pushed yet) 
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) {
      this.isPointerDown = true;
      this.isPointerInside = true;
      if ("touchstart" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse
      }    
      this.timeDown = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier, this.timeDown); 
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.eventXDown = event.eventX;
      this.eventYDown = event.eventY;
      cuiRepaint();
      return true;
    }
    else if (isIn && ("touchend" == event.type || "touchcancel" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && ("touchmove" == event.type || "touchend" == event.type || 
      "touchcancel" == event.type || "mousemove" == event.type || "mouseup" == event.type)) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return false; // none of our business
    }
    else {
      return false; // none of our business
    }
  }
  else if (this.isPointerDown) { // grabbed object state 
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) {
      this.isPointerDown = true;
      this.isPointerInside = true;
      if ("touchstart" == event.type) {
        this.identifier = event.identifier;
      } 
      else {
        this.identifier = -1; // mouse 
      }    
      this.timeDown = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier, this.timeDown); 
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.eventXDown = event.eventX;
      this.eventYDown = event.eventY;
      cuiRepaint();
      return true;
    }
    else if ("mouseup" == event.type || ("mousemove" == event.type && 0 == event.buttons)) { 
      this.isPointerDown = false;
      this.isPointerInside = isIn;
      this.identifier = -1; // mouse 
      this.hasTriggeredClick = true;
      cuiRepaint();
      return true; 
    }
    else if ("touchend" == event.type) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      this.hasTriggeredClick = true;
      cuiRepaint();
      return true; 
    }
    else if ("touchcancel" == event.type) { 
      this.isPointerDown = false;
      this.isPointerInside = false;
      cuiRepaint();
      return true; 
    }
    else if ("touchmove" == event.type || ("mousemove" == event.type)) {
      this.isPointerInside = isIn;
      if (cuiConstants.isDraggableWithOneFinger & interactionBits) {
        if (!(cuiConstants.isLimitedToVerticalDragging & interactionBits)) { 
          this.translationX = this.translationXDown + (event.eventX - this.eventXDown);
        }
        if (!(cuiConstants.isLimitedToHorizontalDragging & interactionBits)) {
          this.translationY = this.translationYDown + (event.eventY - this.eventYDown);
        }
      }
      cuiRepaint();
      return true; 
    }
    else if (!isIn && (("mousedown" == event.type && this.identifier < 0) ||
      ("touchstart" == event.type && this.identifier == event.identifier))) {
      this.isPointerDown = false;
      this.isPointerInside = false;
      return false; // none of our business
    }
    else {
      return false; // none of our business
    }
  }
  // unreachable code
  return false;
}


/**
 * @class cuiTransformable
 * @classdesc Transformable objects can be translated, rotated, and scaled with one- and 
 * two-finger gestures.
 *
 * @desc Create a new cuiTransformable.
 */
function cuiTransformable() {
  /** 
   * Clockwise rotation angle in degrees by which the object has been rotated. 
   * @member {number} cuiTransformable.rotation 
   */
  this.rotation = 0; 
  /** 
   * Scaling factor by which the object has been magnified. 
   * @member {number} cuiTransformable.scale 
   */
  this.scale = 1; 
  /** 
   * Difference in x coordinate by which the centre of the transformable has been moved relative to its
   * initial position (specified by x + 0.5 * width with the arguments of {@link cuiTransformable#process}). 
   * @member {number} cuiTransformable.translationX 
   */
  this.translationX = 0;
  /** 
   * Difference in y coordinate by which the centre of the transformable has been moved relative to its
   * initial position (specified by y + 0.5 * height with the arguments of {@link cuiTransformable#process}). 
   * @member {number} cuiTransformable.translationY 
   */
  this.translationY = 0;
  /** 
   * Flag specifying whether a mouse button or first finger is inside the object's rectangle.
   * @member {boolean} cuiTransformable.isPointerInside0
   */
  this.isPointerInside0 = false;
  /** 
   * Flag specifying whether a mouse button or first finger is pushing the object or has been
   * pushing the object and is still held down (but may have moved outside the object's    
   * rectangle). 
   * @member {boolean} cuiTransformable.isPointerDown0 
   */
  this.isPointerDown0 = false; 
  /** 
   * Flag specifying whether a second finger is pushing the object or has been
   * pushing the object and is still held down (but may have moved outside the object's    
   * rectangle). 
   * @member {boolean} cuiTransformable.isPointerDown1 
   */
  this.isPointerDown1 = false; 
  this.hasTriggeredClick = false; // click event has been triggered?
  this.hasTriggeredDoubleClick = false; // double click event has been triggered?
  this.hasTriggeredHold0 = false; // hold event has been triggered for first pointer?
  this.hasTriggeredHold1 = false; // hold event has been triggered for second pointer?
  /** 
   * Flag to specify whether to process events even if they are outside of the rectangle.
   * If true, it will consume many more events and therefore should only be used for background objects.
   * @member {boolean} cuiTransformable.isProcessingOuterEvents
   */
  this.isProcessingOuterEvents = false;
  
  this.timeDown0 = 0; // time in milliseconds after January 1, 1970 when the first pointer went down
  this.timeDown1 = 0; // time in milliseconds after January 1, 1970 when the second pointer went down
  this.identifier0 = -1; // identifier of the first touch point (-1 for mouse)
  this.identifier1 = -1; // identifier of the second touch point (-1 for mouse)
  this.translationXDown = 0; // value of translationX when the pointer went down
  this.translationYDown = 0; // value of translationX when the pointer went down
  this.rotationDown = 0; // value of rotation when the pointer went down
  this.scaleDown = 0; // value of scale when the pointer went down
  this.eventXDown0 = 0; // x coordinate of the event when the first pointer went down 
  this.eventYDown0 = 0; // y coordinate of the event when the first pointer went down 
  this.eventXDown1 = 0; // x coordinate of the event when the second pointer went down 
  this.eventYDown1 = 0; // y coordinate of the event when the second pointer went down 
  this.eventX0 = 0; // current x coordinate of the first pointer 
  this.eventY0 = 0; // current Y coordinate of the first pointer 
  this.eventX1 = 0; // current x coordinate of the second pointer 
  this.eventY1 = 0; // current y coordinate of the second pointer 
};

/**
 * Returns whether the transformable has just been clicked. 
 * @returns {boolean} True if the draggable has been clicked, false otherwise.
 */
cuiTransformable.prototype.isClicked = function() {
  return this.hasTriggeredClick;
}

/** 
 * Determine whether the button has just been double clicked. 
 * @returns {boolean} True if the button has been double clicked, false otherwise.
 */
cuiTransformable.prototype.isDoubleClicked = function() {
  return this.hasTriggeredDoubleClick;
}

/** 
 * Determine whether first pointer has just been held down longer than {@link cuiTimeUntilHold}. 
 * @returns {boolean} True if the first pointer has just been held down long enough, false otherwise.
 */
cuiTransformable.prototype.isHeldDown0 = function() {
  return this.hasTriggeredHold0;
}

/** 
 * Determine whether second pointer has just been held down longer than {@link cuiTimeUntilHold}. 
 * @returns {boolean} True if the second pointer has just been held down long enough, false otherwise.
 */
cuiTransformable.prototype.isHeldDown1 = function() {
  return this.hasTriggeredHold1;
}

/** 
 * Either process the event (if event != null) and return true if the event has been processed, 
 * or draw the appropriate image for the object state in the rectangle 
 * with a text string on top of it (if event == null) and return false.
 * This function is usually called by {@link cuiPage.process} of a {@link cuiPage}.
 * @param {Object} event - An object describing a user event by its "type", coordinates in 
 * page coordinates ("eventX" and "eventY"), an "identifier" for touch events, and optionally
 * "buttons" to specify which mouse buttons are depressed. If null, the function should
 * redraw the object.
 * @param {number} x - The x coordinate of the top, left corner of the object's rectangle.
 * @param {number} y - The y coordinate of the top, left corner of the object's rectangle.
 * @param {number} width - The width of the object's rectangle.
 * @param {number} height - The height of the object's rectangle.
 * @param {string} text - A text that is written at the center of the rectangle. (May be null).
 * @param {Object} imageNormal - An image to be drawn inside the object's rectangle if there
 * are no user interactions. (May be null.)
 * @param {Object} imageFocused - An image to be drawn inside the object's rectangle if the
 * mouse hovers over the object's rectangle or a touch point moves into it. (May be null.)
 * @param {Object} imagePressed0 - An image to be drawn inside the object's rectangle if a
 * mouse button is pushed or the object is touched once. (May be null.)
 * @param {Object} imagePressed1 - An image to be drawn inside the object's rectangle if a
 * mouse button is pushed or the object is touched twice. (May be null.)
 * @param {number} interactionBits - The forms of interaction, either {@link cuiConstants.none} 
 * or a bitwise-or of other constants in {@link cuiConstants}, e.g. 
 * cuiConstants.isDraggableWithOneFinger | cuiConstants.isTransformableWithTwoFingers.
 * @returns {boolean} True if event != null and the event has been processed (implying that 
 * no other GUI elements should process it). False otherwise.
 */ 
cuiTransformable.prototype.process = function (event, x, y, width, height, 
  text, imageNormal, imageFocused, imagePressed0, imagePressed1, interactionBits) {
 
  if (null == event) {
    // choose appropriate image
    var image = imageNormal;
    if (this.isPointerDown1) {
      image = imagePressed1;
    } 
    else if (this.isPointerDown0) {
      image = imagePressed0;
    }
    else if (this.isPointerInside0) {
      image = imageFocused;
    }

    // transform and draw object
    cuiContext.save();
    cuiContext.translate(this.translationX, this.translationY);
    cuiContext.translate(x + 0.5 * width, y + 0.5 * height);
    cuiContext.rotate(this.rotation * Math.PI / 180.0);
    cuiContext.scale(this.scale, this.scale);
    cuiContext.translate(-x - 0.5 * width, -y - 0.5 * height);
 
    if (null != text) {
      cuiContext.fillText(text, x, y, width, height);
    }
    if (null != image) {
      cuiContext.drawImage(image, x, y, width, height);
    } 
    cuiContext.restore();   

    return false;       
  }
 
  // check point of event
  var isIn = false;       
  var mappedX = event.eventX - this.translationX;
  var mappedY = event.eventY - this.translationY;
  mappedX = mappedX - x - 0.5 * width;
  mappedY = mappedY - y - 0.5 * height;
  var angle = -this.rotation * Math.PI / 180.0;
  var tempX = Math.cos(angle) * mappedX - Math.sin(angle) * mappedY;
  mappedY = Math.sin(angle) * mappedX  + Math.cos(angle) * mappedY;
  mappedX = tempX / this.scale;
  mappedY = mappedY / this.scale;
  mappedX = mappedX + x + 0.5 * width;
  mappedY = mappedY + y + 0.5 * height;
  if ((x <= mappedX && mappedX < x + width && y <= mappedY && mappedY < y + height) || 
    this.isProcessingOuterEvents) {
    isIn = true;
  }
 
  // clear event notifications (they are only set once and need to be cleared afterwards)
  this.hasTriggeredClick = false;
  this.hasTriggeredDoubleClick = false;
  this.hasTriggeredHold0 = false;
  this.hasTriggeredHold1 = false;
 
  // process double click events
  if ("dblclick" == event.type) {
    this.hasTriggeredDoubleClick = isIn;
    return isIn;
  }
  
  // process our hold events
  if ("mousehold" == event.type) {
    if (event.timeDown == this.timeDown0 && event.identifier == this.identifier0 && 
      this.isPointerDown0) {
      this.hasTriggeredHold0 = true;
      return true;
    }
    return false;
  }
  if ("mousehold" == event.type) {
    if (event.timeDown == this.timeDown1 && event.identifier == this.identifier1 && 
      this.isPointerDown1) {
      this.hasTriggeredHold1 = true;
      return true;
    }
    return false;
  }
  
  // process wheel events
  if ("wheel" == event.type || "mousewheel" == event.type) {
    if (!(cuiConstants.isUniformlyScalableWithTwoFingers & interactionBits)) {
      return false;
    }
    if (isIn) {
      // compute new x and y based on the motion of the point under the mouse
      
      // first compute the point that is mapped to the point under the mouse
      var fixpointX = event.eventX;
      var fixpointY = event.eventY;
      var mappedX = fixpointX - this.translationX - x - 0.5 * width;
      var mappedY = fixpointY - this.translationY - y - 0.5 * height;
      var angle = -this.rotation * Math.PI / 180.0;
      fixpointX = (Math.cos(angle) * mappedX - Math.sin(angle) * mappedY) / this.scale
        + x + 0.5 * width;
      fixpointY = (Math.sin(angle) * mappedX  + Math.cos(angle) * mappedY) / this.scale
        + y + 0.5 * height;
       
      // change scale 
      var delta;
      if ("mousewheel" == event.type) {
        delta = -event.wheelDelta / 30.0;
      }
      else {
        delta = event.deltaY;
      }
      this.scale = this.scale * Math.pow(2.0, -0.025 * delta); 

      // now see where this fixpoint is mapped to with the current transformation
      mappedX = fixpointX - x - 0.5 * width;
      mappedY = fixpointY - y - 0.5 * height;
      angle = this.rotation * Math.PI / 180.0;
      var tempX = this.scale * (Math.cos(angle) * mappedX - Math.sin(angle) * mappedY);
      mappedY = this.scale * (Math.sin(angle) * mappedX  + Math.cos(angle) * mappedY); 
      mappedX = tempX + x + 0.5 * width + this.translationX;
      mappedY = mappedY + y + 0.5 * height + this.translationY;
      
      // (x,y) should be at the position of the mouse; 
      // we change the transformation such that it ends up there
      
      this.translationX = this.translationX + event.eventX - mappedX;
      this.translationY = this.translationY + event.eventY - mappedY;
      
      cuiRepaint();
    }
    return isIn; 
  }

  // ignore mouse or touch points that are not the tracked point (apart from mousedown and touchstart)
  if ((this.isPointerInside0 || this.isPointerDown0)  && !this.isPointerDown1) {  
    if ("touchend" == event.type || "touchmove" == event.type || "touchcancel" == event.type) {
      if (event.identifier != this.identifier0) {
        return false; // ignore all other touch points except "touchstart" events
      }
    } 
    else if (("mousemove" == event.type || "mouseup" == event.type) && this.identifier0 >= 0) {
      return false; // ignore mouse (except mousedown) if we are tracking a touch point
    }
  }
  if (this.isPointerDown0 && this.isPointerDown1) {
    if ("touchend" == event.type || "touchmove" == event.type || "touchcancel" == event.type) {
      if (event.identifier != this.identifier0 && 
        event.identifier != this.identifier1) {
        return false; // ignore all other touch points except "touchstart" events
      }
    }
    else if (("mousemove" == event.type || "mouseup" == event.type) && 
      (this.identifier0 >= 0 && this.identifier1 >= 0)) {
      return false; // ignore mouse (except mousedown) if we are tracking a touch point    
    }
  }

  // state changes
  if (!this.isPointerInside0 && !this.isPointerDown0 && !this.isPointerDown1) { // passive object state
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) { // add 0th point
      this.isPointerDown0 = true;
      this.isPointerInside0 = true;
      if ("touchstart" == event.type) {
        this.identifier0 = event.identifier;
      } 
      else {
        this.identifier0 = -1; // mouse 
      }    
      this.timeDown0 = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier0, this.timeDown0); 
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.rotationDown = this.rotation;
      this.scaleDown = this.scale;
      this.eventXDown0 = event.eventX;
      this.eventYDown0 = event.eventY;
      this.eventX0 = event.eventX;
      this.eventY0 = event.eventY;
      cuiRepaint();
      return true;
    }
    else if (isIn && ("mousemove" == event.type || "mouseup" == event.type || 
      "touchmove" == event.type)) { 
      this.isPointerDown0 = false;
      this.isPointerInside0 = true;
      if ("touchmove" == event.type) {
        this.identifier0 = event.identifier;
      } 
      else {
        this.identifier0 = -1; // mouse 
      }    
      cuiRepaint();
      return true;
    }
    else {
      return false; // none of our business
    }
  }
  else if (this.isPointerInside0 && !this.isPointerDown0 && !this.isPointerDown1) { // focused object state (not pushed yet) 
    if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) { // add 0th point
      this.isPointerDown0 = true;
      this.isPointerInside0 = true;
      if ("touchstart" == event.type) {
        this.identifier0 = event.identifier;
      } 
      else {
        this.identifier0 = -1; // mouse 
      }    
      this.timeDown0 = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier0, this.timeDown0); 
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.rotationDown = this.rotation;
      this.scaleDown = this.scale;
      this.eventXDown0 = event.eventX;
      this.eventYDown0 = event.eventY;
      this.eventX0 = event.eventX;
      this.eventY0 = event.eventY;
      cuiRepaint();
      return true;
    }
    else if (isIn && ("touchend" == event.type || "touchcancel" == event.type)) { 
      this.isPointerDown0 = false;
      this.isPointerInside0 = false;
      cuiRepaint();
      return true; 
    }
    else if (!isIn && ("touchmove" == event.type || "touchend" == event.type || 
      "touchcancel" == event.type || "mousemove" == event.type || "mouseup" == event.type)) { 
      this.isPointerDown0 = false;
      this.isPointerInside0 = false;
      cuiRepaint();
      return false; // none of our business
    }
    else {
      return false; // none of our business
    }
  }
  else if (this.isPointerDown0 && !this.isPointerDown1) { // object grabbed once 
    if (isIn && this.identifier0 < 0 && "mousedown" == event.type) { 
      // replace 0th mouse point
      this.identifier0 = -1; // mouse down
      this.isPointerDown0 = true;
      this.timeDown0 = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier0, this.timeDown0); 
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.rotationDown = this.rotation;
      this.scaleDown = this.scale;
      this.eventXDown0 = event.eventX;
      this.eventYDown0 = event.eventY;
      this.eventX0 = event.eventX;
      this.eventY0 = event.eventY;
      cuiRepaint();
      return true;
    }
    else if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) { 
      // add 1st touch point
      this.isPointerDown1 = true;
      if ("touchstart" == event.type) {
        this.identifier1 = event.identifier;
      } 
      else {
        this.identifier1 = -1; // mouse 
      }    
      this.timeDown1 = (new Date()).getTime();
      setTimeout(cuiSendHoldEvent, cuiTimeUntilHold, event.clientX, event.clientY, this.identifier1, this.timeDown1); 
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.rotationDown = this.rotation;
      this.scaleDown = this.scale;
      this.eventXDown0 = this.eventX0;
      this.eventYDown0 = this.eventY0;
      this.eventXDown1 = event.eventX;
      this.eventYDown1 = event.eventY;
      this.eventX1 = event.eventX;
      this.eventY1 = event.eventY;
      cuiRepaint();
      return true;
    } 
    else if ("mouseup" == event.type || ("mousemove" == event.type && 0 == event.buttons)) { 
      this.isPointerDown0 = false;
      this.isPointerInside0 = isIn;
      this.identifier0 = -1; // mouse 
      if (isIn) {
        this.hasTriggeredClick = true;
      }
      cuiRepaint();
      return true; 
    }
    else if ("touchend" == event.type) { 
      this.isPointerDown0 = false;
      this.isPointerInside0 = false;
      if (isIn) {
        this.hasTriggeredClick = true;
      }
      cuiRepaint();
      return true; 
    }
    else if ("touchcancel" == event.type) { 
      this.isPointerDown0 = false;
      this.isPointerInside0 = false;
      cuiRepaint();
      return true; 
    }
    else if ("touchmove" == event.type || ("mousemove" == event.type)) {
      this.isPointerInside0 = isIn;
      this.eventX0 = event.eventX;
      this.eventY0 = event.eventY;
      if (cuiConstants.isDraggableWithOneFinger & interactionBits) {
        this.translationX = this.translationXDown + (this.eventX0 - this.eventXDown0);
        this.translationY = this.translationYDown + (this.eventY0 - this.eventYDown0);
      }
      cuiRepaint();
      return true; 
    }
    else if (!isIn && (("mousedown" == event.type && this.identifier0 < 0) ||
      ("touchstart" == event.type && this.identifier0 == event.identifier))) {
      this.isPointerDown0 = false;
      this.isPointerInside0 = false;
      cuiRepaint();
      return false; // none of our business
    }
    else {
      return false; // none of our business
    }
  }
  else if (this.isPointerDown1) { // two pointers down
    if (("mouseup" == event.type && this.identifier0 < 0) || 
      (("touchend" == event.type || "touchcancel" == event.type) && 
      event.identifier == this.identifier0)) { // 0th point goes up
       // remove 0th point, replace by 1st 
      this.isPointerDown1 = false;
      this.isPointerDown0 = true;
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.rotationDown = this.rotation;
      this.scaleDown = this.scale; 
      this.eventXDown0 = this.eventX1;
      this.eventYDown0 = this.eventY1;
      this.eventX0 = this.eventX1;
      this.eventY0 = this.eventY1;
      this.identifier0 = this.identifier1;
      if (isIn) {
        this.hasTriggeredClick = true;
      }
      cuiRepaint();
      return true;
    }
    else if (("mouseup" == event.type && this.identifier1 < 0) || 
      (("touchend" == event.type || "touchcancel" == event.type) && 
      event.identifier == this.identifier1)) { // 1st point goes up
      // just remove 1st point
      this.isPointerDown1 = false;
      this.isPointerDown0 = true;
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.rotationDown = this.rotation;
      this.scaleDown = this.scale; 
      this.eventXDown0 = this.eventX0;
      this.eventYDown0 = this.eventY0;
      if (isIn) {
        this.hasTriggeredClick = true;
      }
      cuiRepaint();
      return true;
    } 
    else if (isIn && ("mousedown" == event.type || "touchstart" == event.type)) { 
      // remove 0th point, replace by 1st, add new as 1stby removing the 0th point, 
      // the user has a way of getting rid of ghost points
      // which are no longer tracked (but which we still assume to be active)
      this.translationXDown = this.translationX;
      this.translationYDown = this.translationY;
      this.rotationDown = this.rotation;
      this.scaleDown = this.scale;
      this.eventXDown0 = this.eventX1;
      this.eventYDown0 = this.eventY1;
      this.eventX0 = this.eventX1;
      this.eventY0 = this.eventY1;
      this.identifier0 = this.identifier1;
      this.eventXDown1 = event.eventX;
      this.eventYDown1 = event.eventY;
      this.eventX1 = event.eventX;
      this.eventY1 = event.eventY;
      if ("touchstart" == event.type) {
        this.identifier1 = event.identifier;
      } 
      else {
        this.identifier1 = -1; // mouse 
      }    
      cuiRepaint();
      return true;
    } 
    else if ("touchmove" == event.type || ("mousemove" == event.type)) {
      // update dragging
      if (("mousemove" == event.type && this.identifier0 < 0) || 
        ("touchmove" == event.type && event.identifier == this.identifier0)) { 
        this.eventX0 = event.eventX;
        this.eventY0 = event.eventY;
      }
      else if (("mousemove" == event.type && this.identifier1 < 0) || 
        ("touchmove" == event.type && event.identifier == this.identifier1)) { 
        this.eventX1 = event.eventX;
        this.eventY1 = event.eventY;
      }
      else {
        return false; // we should not have gotten this event (see above for the filtering)
      }
 
      if (cuiConstants.isRotatableWithTwoFingers & interactionBits) {
        // compute new rotation
        this.rotation = this.rotationDown + 
          (Math.atan2(this.eventY1 - this.eventY0, 
          this.eventX1 - this.eventX0) - 
          Math.atan2(this.eventYDown1 - this.eventYDown0, 
          this.eventXDown1 - this.eventXDown0)
          ) * 180.0 / Math.PI;
        while (this.rotation >= 360.0) {
          this.rotation -= 360.0;
        }
        while (this.rotation < 0.0) {
          this.rotation += 360.0;
        }
      }

      if (cuiConstants.isUniformlyScalableWithTwoFingers & interactionBits) {
        // compute new scale
        var diffPointsLength = 
          Math.sqrt((this.eventX0 - this.eventX1) * 
          (this.eventX0 - this.eventX1) +  
          (this.eventY0 - this.eventY1) * 
          (this.eventY0 - this.eventY1));
        var diffPointsLengthDown = 
          Math.sqrt((this.eventXDown0 - this.eventXDown1) * 
          (this.eventXDown0 - this.eventXDown1) +  
          (this.eventYDown0 - this.eventYDown1) * 
          (this.eventYDown0 - this.eventYDown1));
        this.scale = this.scaleDown * diffPointsLength / 
           diffPointsLengthDown;  
      }

      if (cuiConstants.isDraggableWithTwoFingers & interactionBits) {
        // compute new x and y based on the motion of the center between the two points
      
        // first compute the point that was mapped to the center between the two fingers when grabbed  
        var fixpointX = 0.5 * (this.eventXDown0 + this.eventXDown1);
        var fixpointY = 0.5 * (this.eventYDown0 + this.eventYDown1);
        var mappedX = fixpointX - this.translationXDown - x - 0.5 * width;
        var mappedY = fixpointY - this.translationYDown - y - 0.5 * height;
        var angle = -this.rotationDown * Math.PI / 180.0;
        fixpointX = (Math.cos(angle) * mappedX - Math.sin(angle) * mappedY) / this.scaleDown
          + x + 0.5 * width;
        fixpointY = (Math.sin(angle) * mappedX  + Math.cos(angle) * mappedY) / this.scaleDown
          + y + 0.5 * height;
       
        // now see where this fixpoint is mapped to with the current transformation
        mappedX = fixpointX - x - 0.5 * width;
        mappedY = fixpointY - y - 0.5 * height;
        angle = this.rotation * Math.PI / 180.0;
        var tempX = this.scale * (Math.cos(angle) * mappedX - Math.sin(angle) * mappedY);
        mappedY = this.scale * (Math.sin(angle) * mappedX  + Math.cos(angle) * mappedY); 
        mappedX = tempX + x + 0.5 * width + this.translationX;
        mappedY = mappedY + y + 0.5 * height + this.translationY;
      
        // (x,y) should be at the center between the two fingers; 
        // we change the transformation such that it ends up there
      
        this.translationX = this.translationX + 
          0.5 * (this.eventX0 + this.eventX1) - mappedX;
        this.translationY = this.translationY + 
          0.5 * (this.eventY0 + this.eventY1) - mappedY;
      }
      cuiRepaint();
      return true; 
    } 
    else {
      return false;
    }
  }
  // unreachable code
  return false;
}


/**
 * @class cuiKeyframe
 * @classdesc A keyframe defines an array of numeric values at a certain time with tangents for the interpolation 
 * right before and right after that time. Instead of using the constructor, objects can also be initialized
 * with "{time : ..., in : ..., out : ..., values : [..., ...]}"
 * (See {@link cuiAnimation}.)
 * 
 * @desc Create a new cuiKeyframe.
 * @param {number} time - The time of the keyframe (in seconds relative to the start of the animation). 
 * @param {number} inTangent - Number specifying the tangent before the keyframe; -1: linear interpolation,  
 * 0: horizontal tangent, 1: cubic Hermite, others: scaled slope of +1/-1 cases. 
 * @param {number} outTangent - Number specifying the tangent after the keyframe; -1: linear interpolation, 
 * 0: horizontal tangent, 1: cubic Hermite, others: scaled slope of +1/-1 cases. 
 * @param {number[]} values - An array of numbers; all keyframes of one animation should have 
 * values arrays of the same size.
 */
function cuiKeyframe(time, inTangent, outTangent, values) {
  /** 
   * The time of the keyframe (in seconds relative to the start of the animation). 
   * @member {number} cuiKeyframe.time 
   */
  this.time = time;
  /** 
   * Number specifying the tangent before the keyframe; -1: linear interpolation,  
   * 0: horizontal tangent, 1: cubic Hermite, others: scaled slope of +1/-1 cases. 
   * @member {number} cuiKeyframe.in 
   */
  this.in = inTangent;
  /** 
   * Number specifying the tangent after the keyframe; -1: linear interpolation,  
   * 0: horizontal tangent, 1: cubic Hermite, others: scaled slope of +1/-1 cases. 
   * @member {number} cuiKeyframe.out 
   */
  this.out = outTangent;
  /** 
   * An array of numbers; all keyframes of one animation should have 
   * values arrays of the same size.
   * @member {number[]} cuiKeyframe.values 
   */
  this.values = values;
}

/**
 * @class cuiAnimation
 * @classdesc Animations allow to animate (i.e. interpolate) numbers specified by keyframes.
 * (See {@link cuiKeyframe}.)
 *
 * @desc Create a new cuiAnimation.
 */
function cuiAnimation() {
  this.keyframes = null;
  this.stretch = 1.0;
  this.start = 0;
  this.end = 0;
  this.donecallback = null;
  this.isLooping = false;
}

/** 
 * Play an animation. 
 * @param {cuiKeyframe[]} keyframes - An array of keyframe objects. (Object initialization with 
 * something like var keys = [{time : ..., in : ..., out : ..., values : [..., ...]}, {...}, ...];
 * is encouraged.) (See {@link cuiKeyframe}.)
 * @param {number} stretch - A scale factor for the times in the keyframes; 
 * one way of usage: start designing keyframe times with stretch = 1 and 
 * adjust the overall timing at the end by adjusting stretch;
 * another way of usage: define all times of keyframes between 0 and 1 (as in CSS transitions) 
 * and then set stretch to the length of the animation in seconds.
 * @param {boolean} isLooping - Whether to repeat the animation endlessly.
 */
cuiAnimation.prototype.play = function(keyframes, stretch, isLooping, donecallback) {
  this.keyframes = keyframes;
  this.stretch = stretch;
  karstendonecallback = donecallback;
  this.isLooping = isLooping;
  this.start = (new Date()).getTime();
  this.end = this.start +
    1000.0 * this.keyframes[this.keyframes.length - 1].time * this.stretch;
  if (this.end > cuiAnimationsEnd) { // new maximum end?
    cuiAnimationsEnd = this.end;
  }
  cuiRepaint();
}

/**
 * Stop looping the animation.
 */
cuiAnimation.prototype.stopLooping = function() {
  this.isLooping = false;
}

/** 
 * Determine whether the animation is currently playing. 
 * @returns {boolean} True if the animation is currently playing, false otherwise.
 */
cuiAnimation.prototype.isPlaying = function() {
  if (!this.isLooping) {
    return ((new Date()).getTime() < this.end);
  }
  else {
    return (this.end > 0);
  }
}

/** 
 * Compute an array of interpolated values based on the keyframes and the current time. 
 * Returns the values array of the 0th keyframe if the animation hasn't started yet 
 * and the values array of the last keyframe if it has finished playing. 
 * This makes it possible to use animateValues even after the animation has stopped. 
 * (See {@link cuiKeyframe}.)
 * @returns {number[]} An array of interpolated values.
 */
cuiAnimation.prototype.animateValues = function() { 
  var now = (new Date()).getTime();
  if (now < this.start || this.end <= this.start) { // animation not started?
    return this.keyframes[0].values; 
  }
  if (now > this.end) { // current loop of animation already over?
    if (!this.isLooping) {
      return this.keyframes[this.keyframes.length - 1].values; 
    }
    // restart the animation
    var length = 1000.0 * this.keyframes[this.keyframes.length - 1].time * this.stretch;
    this.start = this.start + Math.floor((now - this.start) / length) * length;
    this.end = this.start + length;
    if (this.end > cuiAnimationsEnd) { // new maximum end?
      cuiAnimationsEnd = this.end;
    }
  }

  // determine index iTo of keyframe after(!) current time t
  var iTo = 0;
  var ut = 0.001 * (now - this.start) / this.stretch;
    // unstretched time relative to animation start in seconds
  while (iTo < this.keyframes.length &&
    this.keyframes[iTo].time < ut) {
    iTo = iTo + 1;
  }
  var iFrom = iTo - 1; // index of keyframe before t
  if (iTo == 0) {
    return this.keyframes[0].values;
  }
  if (iTo >= this.keyframes.length) {
    return this.keyframes[this.keyframes.length - 1].values;
  }
  // interpolate each value
  var newValues = this.keyframes[iFrom].values.slice(0);
  var t0 = this.keyframes[iFrom].time;
  var t1 = this.keyframes[iTo].time;
  var t = (ut - t0) / (t1 - t0)
  var tt = t * t;
  var ttt = tt * t;
  for (var iValue = 0; iValue < newValues.length; iValue++) {
    // compute values for cubic Hermite spline with out/in determining
    // the velocity: out/in = -1: linear, out/in = 0: slow (i.e. 0),
    // out/in = 1: smooth (Catmull-Rom spline).
    // The magnitude of in/out changes the velocity accordingly.
    var p0, p1, m0, m1;
    p0 = this.keyframes[iFrom].values[iValue];
    p1 = this.keyframes[iTo].values[iValue];
    // compute out slope m0 at iFrom
    if (this.keyframes[iFrom].out < 0.0) { // linear
      m0 = (p1 - p0) / (t1 - t0) * (-this.keyframes[iFrom].out);
    }
    else if (iFrom > 0) { // smooth, not in first interval
      m0 = (p1 - this.keyframes[iFrom - 1].values[iValue]) /
        (t1 - this.keyframes[iFrom - 1].time) *
        this.keyframes[iFrom].out;
    }
    else { // smooth, in first interval
      m0 = (p1 - p0) / (t1 - t0) * this.keyframes[iFrom].out;
    } 
    // compute in slope m1 at iTo
    if (this.keyframes[iTo].in < 0.0) { // linear
      m1 = (p1 - p0) / (t1 - t0) * (-this.keyframes[iTo].in);
    }
    else if (iTo < this.keyframes.length - 1) { // smooth, not last interval
      m1 = (this.keyframes[iTo + 1].values[iValue] - p0) /
        (this.keyframes[iTo + 1].time - t0) *
        this.keyframes[iTo].in;
    }
    else { // smooth, in last interval
      m1 = (p1 - p0) / (t1 - t0) * this.keyframes[iTo].in;
    } 
    // cubic Hermite curve interpolation
    newValues[iValue] =  (2.0*ttt-3.0*tt+1.0) * p0 +
      (ttt-2.0*tt+t)*(t1-t0) * m0 +
      (-2.0*ttt+3.0*tt) * p1 +
      (ttt-tt) * (t1-t0) * m1;
  }
  return newValues;
}


/**
 * Play a transition between two pages.
 * @example
 * // push to left (reverse of push to right)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 2, 0, 0.25,
 *               -2.0, 0.0, 1.0, 1.0, 0, 1.0,
 *               +2.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // push to right (reverse of push to left)
 *             cuiPlayTransition(firstPage, secondPage, 
 *                true, false, 2, 0, 0.25,
 *               +2.0, 0.0, 1.0, 1.0, 0, 1.0,
 *               -2.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // push down (reverse of push to up)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 2, 0, 0.25,
 *               0.0, -2.0, 1.0, 1.0, 0, 1.0,
 *               0.0, +2.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // push up (reverse of push down)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 2, 0, 0.25,
 *               0.0, +2.0, 1.0, 1.0, 0, 1.0,
 *               0.0, -2.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // cover from top to bottom (reverse of uncover from bottom to top)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               false, false, 2, 0, 0.25,
 *               0.0, +0.0, 1.0, 1.0, 0, 1.0,
 *               0.0, -2.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // uncover from bottom to top (reverse of cover from top to bottom)
 *             cuiPlayTransition(firstPage, secondPage, 
 *                true, false, 2, 0, 0.25,
 *                0.0, -2.0, 1.0, 1.0, 0, 1.0,
 *                0.0, +0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // cover from bottom to top (reverse of uncover from top to bottom)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               false, false, 2, 0, 0.25,
 *               0.0, -0.0, 1.0, 1.0, 0, 1.0,
 *               0.0, +2.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // uncover from top to bottom (reverse of cover from bottom to top)
 *             cuiPlayTransition(firstPage, secondPage, 
 *                true, false, 2, 0, 0.25,
 *                0.0, +2.0, 1.0, 1.0, 0, 1.0,
 *                0.0, -0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // cover from left to right (reverse of uncover from right to left)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               false, false, 2, 0, 0.25,
 *               +0.0, 0.0, 1.0, 1.0, 0, 1.0,
 *               -2.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // uncover from right to left (reverse of cover from left to right)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 2, 0, 0.25,
 *               -2.0, 0.0, 1.0, 1.0, 0, 1.0,
 *                0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // cover from right to left (reverse of uncover from left to right)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               false, false, 2, 0, 0.25,
 *               +0.0, 0.0, 1.0, 1.0, 0, 1.0,
 *               +2.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // uncover from left to right (reverse of cover from right to left)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 2, 0, 0.25,
 *               +2.0, 0.0, 1.0, 1.0, 0, 1.0,
 *                0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // page turn uncovering from right to left (reverse of page turn covering from left to right)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 0, 0, 0.33,
 *               -1.2, 0.0, 0.2, 1.1, 5, 1.0,
 *               0, 0, 1, 1, 0, 0.8);
 * @example
 * // page turn covering from left to right (reverse of page turn uncovering from left to right)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               false, false, 0, 0, 0.33,
 *               0, 0, 1, 1, 0, 0.8,
 *               -1.2, 0.0, 0.2, 1.1, -5, 1.0);
 * @example
 * // maximize (reverse of minimize)
 *             var startPoint = {x: 300 + 40, y: 50 + 25}; // start point 
 *             firstPage.transformPageToTransitionCoordinates(startPoint);
 *             cuiPlayTransition(firstPage, secondPage, 
 *               false, false, 1, 0, 0.25,
 *               0.0, 0.0, 1.0, 1.0, 0, 0.8,
 *               startPoint.x, startPoint.y, 0.1, 0.1, -5, 1.0);
 * @example
 * // minimize (reverse of maximize)
 *             var targetPoint = {x: 300 + 40, y: 50 + 25}; // target point 
 *             secondPage.transformPageToTransitionCoordinates(targetPoint);
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 0, 1, 0.3, 
 *               targetPoint.x, targetPoint.y, 0.1, 0.1, 5, 1.0,
 *               0.0, 0.0, 1.0, 1.0, 0, 0.8);
 * @example
 * // dissolve (reverse of itself)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 0, 0, 0.33,
 *               0.0, 0.0, 1.0, 1.0, 0, 0.0,
 *               0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // fade through black (reverse of itself)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 1, 1, 0.33,
 *               0.0, 0.0, 1.0, 1.0, 0, -1.0,
 *               0.0, 0.0, 1.0, 1.0, 0, -1.0);
 * @example
 * // materialize from air (reverse of dissolve into air)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, false, 0, 0, 0.33,
 *               0.0, 0.0, 1.0, 1.0, 0, 0.0,
 *               0.0, 0.0, 2.0, 2.0, 0, 1.0);
 * @example
 * // dissolve into air (reverse of materialize from air)
 *             cuiPlayTransition(firstPage, secondPage, 
 *                true, false, 0, 0, 0.33,
 *                0.0, 0.0, 2.0, 2.0, 0, 0.0,
 *                0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // wipe from left to right (reverse of wipe from right to left)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, true, 1, 1, 0.25,
 *               2.0, 0.0, 1.0, 1.0, 0, 1.0,
 *               0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // wipe from right to left (reverse of wipe from left to right)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, true, 1, 1, 0.25,
 *               -2.0, 0.0, 1.0, 1.0, 0, 1.0,
 *               0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // wipe from top to bottom (reverse of wipe from bottom to top)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, true, 1, 1, 0.25,
 *               0.0, 2.0, 1.0, 1.0, 0, 1.0,
 *               0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @example
 * // wipe from bottom to top (reverse of wipe from top to bottom)
 *             cuiPlayTransition(firstPage, secondPage, 
 *               true, true, 1, 1, 0.25,
 *               0.0, -2.0, 1.0, 1.0, 0, 1.0,
 *               0.0, 0.0, 1.0, 1.0, 0, 1.0);
 * @param {cuiPage} previousPage - The initial page for the transition.
 * @param {cuiPage} nextPage - The final page for the transition.
 * @param {boolean} isPreviousOverNext - Whether to draw previousPage over nextPage.
 * @param {boolean} isFrontMaskAnimated - Whether to animate only an opacity mask of the page in front.
 * @param {number} animationInitialSpeed - 0 for zero initial speed, 1 for linear interpolation, other values scale the speed.
 * @param {number} animationFinalSpeed - 0 for zero final speed, 1 for linear interpolation, other values scale the speed.
 * @param {number} animationLength - Length of the transition in seconds. 
 * @param {number} previousFinalPositionX - Final x position of the previous page (-1/+1: centered on left/right edge). 
 * @param {number} previousFinalPositionY - Final y position of the previous page (-1/+1: centered on top/bottom edge). 
 * @param {number} previousFinalScaleX - Final x scale of the previous page (1: no scaling). 
 * @param {number} previousFinalScaleY - Final y scale of the previous page (1: no scaling). 
 * @param {number} previousFinalRotation - Final rotation in degrees of the previous page (0: no rotation). 
 * @param {number} previousFinalOpacity - Final opacity of the previous page (0: transparent, 1: opaque). 
 * @param {number} nextInitialPositionX - Initial x position of the next page (-1/+1: centered on left/right edge). 
 * @param {number} nextInitialPositionY - Initial y position of the next page (-1/+1: centered on top/bottom edge). 
 * @param {number} nextInitialScaleX - Initial x scale of the next page (1: no scaling). 
 * @param {number} nextInitialScaleY - Initial y scale of the next page (1: no scaling). 
 * @param {number} nextInitialRotation - Initial rotation in degrees of the next page (0: no rotation). 
 * @param {number} nextInitialOpacity - Initial opacity of the next page (0: transparent, 1: opaque). 
 */
function cuiPlayTransition(
  previousPage, nextPage, isPreviousOverNext, isFrontMaskAnimated,
  animationInitialSpeed, animationFinalSpeed, animationLength,
  previousFinalPositionX, previousFinalPositionY,
  previousFinalScaleX, previousFinalScaleY,
  previousFinalRotation, previousFinalOpacity,
  nextInitialPositionX, nextInitialPositionY,
  nextInitialScaleX, nextInitialScaleY,
  nextInitialRotation, nextInitialOpacity)
{ 
  // if necessary, create previousCanvas and nextCanvas
  if (null == cuiAnimationForTransitions.previousCanvas) {
    cuiAnimationForTransitions.previousCanvas = document.createElement("canvas");
  }
  if (null == cuiAnimationForTransitions.nextCanvas) {
    cuiAnimationForTransitions.nextCanvas = document.createElement("canvas");
  }

  // draw previousCanvas and nextCanvas

  // save current animations state and make sure the render loop doesn't render now
  var tempCanvas = cuiCanvas;
  var tempAnimationsArePlaying = cuiAnimationsArePlaying;
  var tempAnimationsEnd = cuiAnimationsEnd;
  cuiAnimationsArePlaying = false;
  var karstendonecallback = null;
  cuiAnimationsEnd = 0; 

  // draw previous page into previousCanvas
  var previousCanvas = cuiAnimationForTransitions.previousCanvas;
  cuiCurrentPage = previousPage;
  cuiCanvas = previousCanvas;
  cuiContext = previousCanvas.getContext("2d");
  cuiProcess(null);

  // draw next page into nextCanvas
  var nextCanvas = cuiAnimationForTransitions.nextCanvas;
  cuiCurrentPage = nextPage;
  cuiCanvas = nextCanvas;
  cuiContext = nextCanvas.getContext("2d");
  cuiProcess(null);

  // restore cui state
  cuiCanvas = tempCanvas;
  cuiContext = cuiCanvas.getContext("2d");
  cuiCurrentPage = cuiPageForTransitions;
  cuiAnimationsArePlaying = tempAnimationsArePlaying; // restore animations state
  cuiAnimationsEnd = tempAnimationsEnd; // restore animations state

  // set cuiAnimationForTransitions
  var transitionKeyframes = [
    {time : 0.00, out : -animationInitialSpeed,
     values : [
      0.0, 0.0, 1.0, 1.0, 0.0, 1.0, // previous page initial values
      nextInitialPositionX, nextInitialPositionY,
      nextInitialScaleX, nextInitialScaleY,
      nextInitialRotation, nextInitialOpacity
    ]}, 
    {time : 1.00, in : -animationFinalSpeed,
     values : [
      previousFinalPositionX, previousFinalPositionY,
      previousFinalScaleX, previousFinalScaleY,
      previousFinalRotation, previousFinalOpacity,
      0.0, 0.0, 1.0, 1.0, 0.0, 1.0 // next page final values
    ]}
  ];
  cuiAnimationForTransitions.nextPage = nextPage;
  cuiAnimationForTransitions.isPreviousOverNext = isPreviousOverNext;
  cuiAnimationForTransitions.isFrontMaskAnimated = isFrontMaskAnimated;
  cuiAnimationForTransitions.play(transitionKeyframes, animationLength);
  cuiIgnoringEventsEnd = cuiAnimationForTransitions.end;
  cuiRepaint();
}

// Draw a frame of the current transition; called by cuiProcess. 
function cuiDrawTransition() {
  var previousCanvas = cuiAnimationForTransitions.previousCanvas;
  var nextCanvas = cuiAnimationForTransitions.nextCanvas;
  var width = cuiCanvas.width;
  var height = cuiCanvas.height;
  var values = cuiAnimationForTransitions.animateValues();
  var previousPositionX = values[0];
  var previousPositionY = values[1];
  var previousScaleX = values[2];
  var previousScaleY = values[3];
  var previousRotation = values[4];
  var previousOpacity = values[5];
  var nextPositionX = values[6];
  var nextPositionY = values[7];
  var nextScaleX = values[8];
  var nextScaleY = values[9];
  var nextRotation = values[10];
  var nextOpacity = values[11];
  
  if (cuiAnimationForTransitions.isPreviousOverNext) {  
    // first draw previous page then next page
    if (!cuiAnimationForTransitions.isFrontMaskAnimated) { 
      // draw without mask
      cuiContext.globalCompositeOperation = "destination-over";
      cuiContext.globalAlpha = Math.max(0.0, Math.min(1.0, previousOpacity));
      cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
      cuiContext.translate((0.5 * previousPositionX + 0.5) * width, 
        (0.5 * previousPositionY + 0.5) * height);
        // translate center as specified
      cuiContext.rotate(previousRotation * Math.PI / 180.0); 
        // rotate around center
      cuiContext.scale(previousScaleX, previousScaleY); 
        // scale image as specified
      cuiContext.translate(-0.5 * width, -0.5 * height); 
        // translate center to origin
      cuiContext.drawImage(previousCanvas, 0, 0, width, height); 
        // draw full size
    } else { // draw with transform mask for wipe transitions
      cuiContext.globalCompositeOperation = "copy";
      cuiContext.globalAlpha = Math.max(0.0, Math.min(1.0, previousOpacity));
      cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
      cuiContext.translate((0.5 * previousPositionX + 0.5) * width, 
        (0.5 * previousPositionY + 0.5) * height);
        // translate center as specified
      cuiContext.rotate(previousRotation * Math.PI / 180.0); 
        // rotate around center
      cuiContext.scale(previousScaleX, previousScaleY); 
        // scale image as specified
      cuiContext.translate(-0.5 * width, -0.5 * height); 
        // translate center to origin
      cuiContext.fillStyle = "#000000";
      cuiContext.fillRect(0, 0, width, height); 
        // draw black full-size mask with specified opacity
      cuiContext.globalCompositeOperation = "source-in";
      cuiContext.globalAlpha = 1.0;
      cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
      cuiContext.drawImage(previousCanvas, 0, 0, width, height); 
        // draw canvas without trafo
    }
    // now draw next page under previous page            
    cuiContext.globalCompositeOperation = "destination-over";
      cuiContext.globalAlpha = Math.max(0.0, Math.min(1.0, nextOpacity));
    cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
    cuiContext.translate((0.5 * nextPositionX + 0.5) * width, 
      (0.5 * nextPositionY + 0.5) * height);
      // translate center as specified
    cuiContext.rotate(nextRotation * Math.PI / 180.0); 
      // rotate around center
    cuiContext.scale(nextScaleX, nextScaleY); // scale image as specified
    cuiContext.translate(-0.5 * width, -0.5 * height); 
      // translate center to origin
    cuiContext.drawImage(nextCanvas, 0, 0, width, height); 
      // draw full size
  } else { 
    // first draw next page then previous page
    if (!cuiAnimationForTransitions.isFrontMaskAnimated) { 
      // draw without mask
      cuiContext.globalCompositeOperation = "destination-over";
      cuiContext.globalAlpha = Math.max(0.0, Math.min(1.0, nextOpacity));
      cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
      cuiContext.translate((0.5 * nextPositionX + 0.5) * width, 
        (0.5 * nextPositionY + 0.5) * height);
        // translate center as specified
      cuiContext.rotate(nextRotation * Math.PI / 180.0); 
        // rotate around center
      cuiContext.scale(nextScaleX, nextScaleY); 
        // scale image as specified
      cuiContext.translate(-0.5 * width, -0.5 * height); 
        // translate center to origin
      cuiContext.drawImage(nextCanvas, 0, 0, width, height); 
        // draw full size
    } else { 
      // draw with transform mask for wipe transitions
      cuiContext.globalCompositeOperation = "copy";
      cuiContext.globalAlpha = Math.max(0.0, Math.min(1.0, nextOpacity));
      cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
      cuiContext.translate((0.5 * nextPositionX + 0.5) * width, 
        (0.5 * nextPositionY + 0.5) * height);
        // translate center as specified
      cuiContext.rotate(nextRotation * Math.PI / 180.0); 
        // rotate around center
      cuiContext.scale(nextScaleX, nextScaleY); 
        // scale image as specified
      cuiContext.translate(-0.5 * width, -0.5 * height); 
        // translate center to origin
      cuiContext.fillStyle = "#000000";
      cuiContext.fillRect(0, 0, width, height); 
        // draw black full-size mask with specified opacity
      cuiContext.globalCompositeOperation = "source-in";
      cuiContext.globalAlpha = 1.0;
      cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
      cuiContext.drawImage(nextCanvas, 0, 0, width, height); 
        // draw canvas without trafo
    }
    // now draw previous page under next page            
    cuiContext.globalCompositeOperation = "destination-over";
    cuiContext.globalAlpha = Math.max(0.0, Math.min(1.0, previousOpacity));
    cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
    cuiContext.translate((0.5 * previousPositionX + 0.5) * width, 
      (0.5 * previousPositionY + 0.5) * height);
      // translate center as specified
    cuiContext.rotate(previousRotation * Math.PI / 180.0); 
      // rotate around center
    cuiContext.scale(previousScaleX, previousScaleY); 
      // scale image as specified
    cuiContext.translate(-0.5 * width, -0.5 * height); 
      // translate center to origin
    cuiContext.drawImage(previousCanvas, 0, 0, width, height); 
      // draw full size
  }       
  // draw opaque background to avoid any semitransparent colors in the canvas
  cuiContext.globalCompositeOperation = "destination-over";
  cuiContext.globalAlpha = 1.0;
  cuiContext.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
  cuiContext.fillStyle = "#000000";
  cuiContext.fillRect(0, 0, width, height);

  if (!cuiAnimationForTransitions.isPlaying()) { 
    // transition has finished
    cuiCurrentPage = cuiAnimationForTransitions.nextPage;
    cuiRepaint();
  }
}
  