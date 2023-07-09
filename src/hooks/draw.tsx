/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect } from "react";

/*****************************************************************************
 * Hooks
 *****************************************************************************/

export const useSmudgeBox = (canvasRef, _width, _height, scaleDown = 10) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth / scaleDown;
    canvas.height = window.innerHeight / scaleDown;

    function reset() {
      const {width, height} = ctx.canvas;
      const wd2 = width / 2;
      const h2 = height / 2;
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#E06C4E';
      /* ctx.fillStyle = "#E8B88C"; */
      /* ctx.fillStyle = "#264652"; */
      ctx.fillRect(wd2 - _width / scaleDown / 2, h2 - _height / scaleDown / 2 + 34 / scaleDown, _width / scaleDown, _height / scaleDown);

      /* ctx.fillStyle = "#264653"; */
      /* ctx.fillRect(0, 0, wd2, height); */
    }
    /* setTimeout(() => { */
      reset();
    /* }, 750) */

    function getCanvasRelativePosition(e, canvas) {
      const rect = canvas.getBoundingClientRect();
      /* console.log(e.clientX, e.clientY) */
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
      const radius = 10;
      const hardness = 0.1;
      alpha = 0.2;
      featherGradient = createFeatherGradient(radius, hardness);
      brushCtx.canvas.width = radius * 2;
      brushCtx.canvas.height = radius * 2;
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
    
    function updateBrush(x, y, clearBrush) {
      let width = brushCtx.canvas.width;
      let height = brushCtx.canvas.height;
      let srcX = x - width / 2;
      let srcY = y - height / 2;
      // draw it in the middle of the brush
      let dstX = (brushCtx.canvas.width - width) / 2;
      let dstY = (brushCtx.canvas.height - height) / 2;

      // clear the brush canvas
      if (clearBrush) {
        brushCtx.clearRect(0, 0, brushCtx.canvas.width, brushCtx.canvas.height);
      }

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
      updateBrush(pos.x, pos.y, true);
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
        updateBrush(line.position[0], line.position[1], true);
      } 
      lastX = pos.x;
      lastY = pos.y;
    }

    function stop() {
      console.log("STOP");
      drawing = false;
    }

    
    let w2 = canvas.width * scaleDown / 2;
    let h2 = canvas.height * scaleDown / 2;
    let cX = w2;
    let cY = h2;
    let mX = cX;
    let mY = cY;

    /* console.log(w2, h2) */

    const handleMouseMove = (e) => {
      /* draw(e); */
      cX = e.clientX;
      cY = e.clientY;
      mX = e.clientX;
      mY = e.clientY;

      /* console.log(cX, cY, w2, h2) */
    }

    window.addEventListener('mousemove', handleMouseMove);

    function getRandomSpread(num) {
      return Math.floor(Math.random() * (num * 2 + 1)) - num;
    }

    function getRandomInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) - Math.abs(min);
    }

    setInterval(() => {
      draw({ clientX: cX, clientY: cY })

      const amtX = getRandomSpread(10);
      const amtY = getRandomSpread(10);

      cX = cX + amtX;
      cY = cY + amtY;
    }, 10)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      stop();
    }
  }, []);
}
