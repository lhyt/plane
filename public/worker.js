if (typeof registerPaint !== 'undefined') {
  class PlaceholderBoxPainter {
    paint(ctx, size) {
      const g1 = ctx.createLinearGradient(0, 0, 0, size.height);
      g1.addColorStop(0, '#000'); 
      g1.addColorStop(1, '#333');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, size.width, size.height);

    }
  }
    class Heart {
    paint(ctx, size) {
      const g1 = ctx.createLinearGradient(0, 0, 0, size.height);
      g1.addColorStop(0, '#E55D87'); 
      g1.addColorStop(1, '#5FC3E4');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, size.width, size.height);
  }
}
  registerPaint('heart', Heart);

  registerPaint('placeholder-box', PlaceholderBoxPainter);
}