export const rewards = [

    {
        description: "Get 1 ClickBot",
        apply(clicker) {
            clicker.clickBots += 1;
        },
        maxLevel: 3,
    },

    {
        description: "Get 10 Clicks",
        apply(clicker) {
            clicker.increment(10);
        },
    },

    {
        description: "Increase Power!",
        apply(clicker) {
            clicker.power += 1;
        },
        minLevel: 3,
    },

];