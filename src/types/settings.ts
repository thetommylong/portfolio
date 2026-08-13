export interface Settings {
    colorScheme: colorScheme,
    animationSpeed: number,
    wallpaper: string,
    maniac: boolean,
}

export enum colorScheme {
    CatppuccinLatte = "latte",
    CatppuccinMocha = "mocha",
    Automatic       = "auto"
}