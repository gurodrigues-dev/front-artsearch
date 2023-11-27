
export const useManipulationColors = () => {
  
  const selectColor = (colors) => {
    const limitDark = 30;
    const limitLight = 180;

    for (let i = 0; i < colors.length; i++) {
      const stringRgb = colors[i].slice(4, -1);
      const valueRgb = stringRgb.split(",");

      const luminosity = 0.299 * valueRgb[0] + 0.587 * valueRgb[1] + 0.114 * valueRgb[2];

      if (luminosity > limitDark && luminosity < limitLight) {
        return colors[i];
      }
    }
  }

  const addOpacity = (color) => {
    const valueRgb = color.slice(4, -1);
    const valueRgba = `rgba(${valueRgb}, 0.6)`;

    return valueRgba;
  }

  const gradient = (color, type) => {
    return {
      background: type === "header" ?
        `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${selectColor(color)}`
        :
        `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgb(28, 28, 28) 100%), linear-gradient(${addOpacity(selectColor(color))} 30%, rgb(28, 28, 28))`
    }
  };

  return { addOpacity, selectColor, gradient };
}