/**
 * Calculates the Euclidean distance between two RGB colors.
 * Colors are represented as 24-bit integers in the form 0xRRGGBB.
 */
export function colorDistance(color1: number, color2: number): number {
  const r1 = (color1 >> 16) & 0xFF;
  const g1 = (color1 >> 8) & 0xFF;
  const b1 = color1 & 0xFF;

  const r2 = (color2 >> 16) & 0xFF;
  const g2 = (color2 >> 8) & 0xFF;
  const b2 = color2 & 0xFF;

  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;

  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Converts an ImageData object into a binary 2D array using color distance and a threshold.
 * Each entry in the returned array is either 0 or 1, representing a black or white pixel.
 * A pixel is white (1) if its Euclidean distance to the target color is less than the threshold.
 *
 * @param imageData the input ImageData from a canvas
 * @param targetColor the reference color as a 24-bit hex RGB integer (0xRRGGBB)
 * @param threshold the distance threshold used to decide whether a pixel is white or black
 * @returns a 2D binary array where 1 represents white and 0 represents black
 */
export function toBinaryArray(
  imageData: ImageData,
  targetColor: number,
  threshold: number
): number[][] {
  const height = imageData.height;
  const width = imageData.width;
  const result: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const index = (r * width + c) * 4;
      const red = imageData.data[index];
      const green = imageData.data[index + 1];
      const blue = imageData.data[index + 2];

      // Convert RGB to 24-bit hex color
      const imageColor = (red << 16) | (green << 8) | blue;
      const distance = colorDistance(targetColor, imageColor);

      if (distance <= threshold) {
        result[r][c] = 1;
      }
    }
  }

  return result;
}

/**
 * Converts a binary 2D array into an ImageData object.
 * Each value should be 0 (black) or 1 (white).
 * Black pixels are encoded as 0x000000 and white pixels as 0xFFFFFF.
 *
 * @param binaryArray a 2D array of 0s and 1s representing the binary image
 * @returns an ImageData object where black and white pixels are represented with standard RGB values
 */
export function toImageData(binaryArray: number[][]): ImageData {
  const height = binaryArray.length;
  const width = binaryArray[0].length;

  const imageData = new ImageData(width, height);

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const index = (r * width + c) * 4;
      const value = binaryArray[r][c] === 1 ? 255 : 0;

      imageData.data[index] = value;     // Red
      imageData.data[index + 1] = value; // Green
      imageData.data[index + 2] = value; // Blue
      imageData.data[index + 3] = 255;   // Alpha (fully opaque)
    }
  }

  return imageData;
}

/**
 * Main binarization function that processes an image from a canvas.
 *
 * @param canvas the source canvas containing the image
 * @param targetColor the reference color as a 24-bit hex RGB integer (0xRRGGBB)
 * @param threshold the distance threshold used to decide whether a pixel is white or black
 * @returns the binarized ImageData
 */
export function binarizeImage(
  canvas: HTMLCanvasElement,
  targetColor: number,
  threshold: number
): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const binaryArray = toBinaryArray(imageData, targetColor, threshold);
  return toImageData(binaryArray);
}
