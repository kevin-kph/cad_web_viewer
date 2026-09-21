const container = document.getElementById('viewerContainer');
if (!container) {
  throw new Error('Cannot find viewer container');
}

const hwv = new Communicator.WebViewer({
  container,
  endpointUri: 'microengine.scs',
  enginePath: '..',
});

window.onload = function () {
  /**
   * These lines grabs input focus when the canvas is ready and add a
   * listener to grab input focus when the mouse enter the canvas.
   */
  hwv.setCallbacks({
    sceneReady: function () {
      const canvas = hwv.getViewElement();

      /**
       * This line is equivalent to canvas.focus()
       */
      hwv.focusInput(true);

      canvas.addEventListener('mouseenter', function () {
        hwv.focusInput(true);
      });

      window.addEventListener('resize', () => {
        if (hwv) {
          hwv.resizeCanvas();
        }
      });
    },
  });

  hwv.start();
};
