document.addEventListener("DOMContentLoaded", function () {
    // 1. Create a 16x34 px canvas
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // 2. Write a character in the center of the canvas
    const fontSize = 14;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillStyle = "blue";

    const text = "A";
    const x = canvas.width / 2;
    const y = canvas.height / 2 + fontSize / 2;
    ctx.fillText(text, x, y);

    // 4. Create a download link using anchor tag
    const downloadButton = document.getElementById("downloadButton");

    // 5. Handle the download functionality
    downloadButton.addEventListener("click", function () {
        // Get the canvas pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;

        // Convert the pixel data to a hex format
        const hexData = [];
        for (let i = 0; i < pixelData.length; i += 4) {
            const r = pixelData[i].toString(16).padStart(2, "0");
            const g = pixelData[i + 1].toString(16).padStart(2, "0");
            const b = pixelData[i + 2].toString(16).padStart(2, "0");
            hexData.push(`#${r}${g}${b}`);
        }

        // Create a blob containing the hex data and set the type
        const blob = new Blob([hexData.join(" ")], { type: "text/plain" });

        // Create a download link and trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "canvas_pixel_data.txt";
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
});
