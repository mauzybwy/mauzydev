/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect } from "react";

/*****************************************************************************
 * Hooks
 *****************************************************************************/

export const useSmudgeBox = (canvasRef, _width, _height) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    /* const brushDisplayCtx = brushDisplay.getContext('2d'); */

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function reset() {
      const {width, height} = ctx.canvas;
      const wd2 = width / 2;
      const h2 = height / 2;
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#E06C4E';
      /* ctx.fillStyle = "#E8B88C"; */
      /* ctx.fillStyle = "#264652"; */
      ctx.fillRect(wd2 - _width / 2, h2 - _height / 2 + 35, _width, _height);

      /* ctx.fillStyle = "#264653"; */
      /* ctx.fillRect(0, 0, wd2, height); */
    }
    /* setTimeout(() => { */
      reset();
    /* }, 750) */

    function getCanvasRelativePosition(e, canvas) {
      const rect = canvas.getBoundingClientRect();
      console.log(e.clientX, e.clientY)
      return {
        x: (e.clientX - rect.left) / rect.width  * canvas.width,
        y: (e.clientY - rect.top ) / rect.height * canvas.height,
      };
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function setupLine(x, y, targetX, targetY) {
      const deltaX = targetX - x;
      const deltaY = targetY - y;
      const deltaRow = Math.abs(deltaX);
      const deltaCol = Math.abs(deltaY);
      const counter = Math.max(deltaCol, deltaRow);
      const axis = counter == deltaCol ? 1 : 0;

      // setup a line draw.
      return {
        position: [x, y],
        delta: [deltaX, deltaY],
        deltaPerp: [deltaRow, deltaCol],
        inc: [Math.sign(deltaX), Math.sign(deltaY)],
        accum: Math.floor(counter / 2),
        counter: counter,
        endPnt: counter,
        axis: axis,
        u: 0,
      };
    };

    function advanceLine(line) {
      --line.counter;
      line.u = 1 - line.counter / line.endPnt;
      if (line.counter <= 0) {
        return false;
      }
      const axis = line.axis;
      const perp = 1 - axis;
      line.accum += line.deltaPerp[perp];
      if (line.accum >= line.endPnt) {
        line.accum -= line.endPnt;
        line.position[perp] += line.inc[perp];
      }
      line.position[axis] += line.inc[axis];
      return true;
    }

    let lastX = 0;
    let lastY = 0;
    let lastForce = 1;
    let drawing = false;
    let alpha = 0.5;

    const brushCtx = document.createElement('canvas').getContext('2d');
    let featherGradient;

    function createFeatherGradient(radius, hardness) {
      const innerRadius = Math.min(radius * hardness, radius - 1);
      const gradient = brushCtx.createRadialGradient(
        0, 0, 0,
        0, 0, radius);
      gradient.addColorStop(0, '#E06C4E00');
      gradient.addColorStop(1, '#264652');
      return gradient;
    }

    function updateBrushSettings() {
      const radius = 69;
      const hardness = 0.1;
      alpha = 0.2;
      featherGradient = createFeatherGradient(radius, hardness);
      brushCtx.canvas.width = radius * 2;
      brushCtx.canvas.height = radius * 2;
      
      {
        /* const ctx = brushDisplayCtx; */
        /* const {width, height} = ctx.canvas; */
        /* ctx.clearRect(0, 0, width, height); */
        /* ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`; */
        /* ctx.fillRect(width / 2 - radius, height / 2 - radius, radius * 2, radius * 2); */
        /* feather(ctx); */
      }
    }
    updateBrushSettings();
    
    function feather(ctx) {
      // feather the brush
      ctx.save();
      ctx.fillStyle = featherGradient;
      ctx.globalCompositeOperation = 'destination-out';
      const {width, height} = ctx.canvas;
      ctx.translate(width / 2, height / 2);
      ctx.fillRect(-width / 2, -height / 2, width, height);  
      ctx.restore();
    }
    
    function updateBrush(x, y) {
      let width = brushCtx.canvas.width;
      let height = brushCtx.canvas.height;
      let srcX = x - width / 2;
      let srcY = y - height / 2;
      // draw it in the middle of the brush
      let dstX = (brushCtx.canvas.width - width) / 2;
      let dstY = (brushCtx.canvas.height - height) / 2;

      // clear the brush canvas
      brushCtx.clearRect(0, 0, brushCtx.canvas.width, brushCtx.canvas.height);

      // clip the rectangle to be
      // inside
      if (srcX < 0) {
        width += srcX;
        dstX -= srcX;
        srcX = 0;
      }
      const overX = srcX + width - ctx.canvas.width;
      if (overX > 0) {
        width -= overX;
      }

      if (srcY < 0) {
        dstY -= srcY;
        height += srcY;
        srcY = 0;
      }
      const overY = srcY + height - ctx.canvas.height;
      if (overY > 0) {
        height -= overY;
      }

      if (width <= 0 || height <= 0) {
        return;
      }

      brushCtx.drawImage(
        ctx.canvas,
        srcX, srcY, width, height,
        dstX, dstY, width, height);    
      
      feather(brushCtx);
    }

    function start(e) {
      console.log("START");
      const pos = getCanvasRelativePosition(e, ctx.canvas);
      lastX = pos.x;
      lastY = pos.y;
      drawing = true;
      updateBrush(pos.x, pos.y);
    }
    
    function draw(e) {
      if (!drawing) {
        /* start(e) */
        
        setTimeout(() => {
          start(e)
        }, 0)

        return
      }

      const pos = getCanvasRelativePosition(e, ctx.canvas);

      const line = setupLine(lastX, lastY, pos.x, pos.y);  
      for (let more = true; more;) {
        more = advanceLine(line);
        ctx.globalAlpha = alpha * lerp(lastForce, 1, line.u);
        ctx.drawImage(
          brushCtx.canvas,
          line.position[0] - brushCtx.canvas.width / 2,
          line.position[1] - brushCtx.canvas.height / 2);
        updateBrush(line.position[0], line.position[1]);
      } 
      lastX = pos.x;
      lastY = pos.y;
    }

    function stop() {
      drawing = false;
    }

    
    const {width, height} = ctx.canvas;
    let cX = (width / 2);
    let cY = (height / 2);

    window.addEventListener('mousemove', (e) => {
      /* draw(e); */
      cX = e.clientX;
      cY = e.clientY;
    });

    setInterval(() => {
      draw({ clientX: cX, clientY: cY })
      cX = cX + Math.floor(Math.random() * 41) - 20
      cY = cY + Math.floor(Math.random() * 41) - 20
    }, 20)

    return () => {
      window.removeEventListener('mousemove', draw);
      stop();
    }
  }, []);
}
