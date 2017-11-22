export function createDashboardLayer(font) {
    const LINE1 = font.size;
    const LINE2 = font.size * 2;

    const score = 1234;
    const time = 294;

    return function drawDashboardLayer(context) {
        font.print("MARIO", context, 16, LINE1);
        font.print("WORLD", context, 152, LINE1);
        font.print("TIME", context, 208, LINE1);

        font.print(score.toString().padStart(6, "0"), context, 16, LINE2);
        font.print(time.toString().padStart(3, "0"), context, 216, LINE2);
    };
}