# Hood Hero Chrome Extension

Hood Hero is a Chrome extension designed to assist options traders on platforms like Robinhood by providing tools for defining stop-loss and take-profit targets.

## Features

- **Stop-Loss & Take-Profit Calculation:** Easily define percentage-based stop-loss and take-profit levels for your options trades.
- **Current Price Integration:** Automatically reads the current option price from the trading page to calculate target prices.
- **Copy to Clipboard:** Quickly copy calculated target prices to paste directly into your broker's order entry fields.
- **Refresh Price:** Manually refresh the current option price to ensure calculations are based on the latest data.
- **Retro Minimal Design:** A clean, retro-inspired user interface that blends seamlessly with your trading experience.

## Installation

1.  **Download the Extension:** Clone or download this repository to your local machine.
    ```bash
    git clone https://github.com/matthewfreitas/hoodhero.git
    ```
2.  **Open Chrome Extensions:** Open Google Chrome and navigate to `chrome://extensions`.
3.  **Enable Developer Mode:** Toggle on "Developer mode" (usually found in the top-right corner).
4.  **Load Unpacked:** Click the "Load unpacked" button.
5.  **Select Extension Folder:** Browse to the directory where you cloned/downloaded the `hoodhero` repository (e.g., `/Users/matt.freitas/hood hero 2/`) and select it.
6.  **Hood Hero Appears:** The "Hood Hero" extension should now appear in your list of extensions.

## Usage

1.  **Navigate to a Trading Page:** Go to an options trading page on your preferred broker (e.g., Robinhood) where the current option price is displayed.
2.  **Activate Overlay:** Click on the Hood Hero extension icon in your Chrome toolbar. In the popup, click the "Activate Overlay" button.
3.  **Define Targets:** The Hood Hero overlay will appear on the trading page. Enter your desired "Take Profit (%)" and "Stop Loss (%)" values.
4.  **View Calculated Prices:** The extension will automatically calculate and display the "Target Profit Price" and "Target Stop Loss Price" based on the current option price on the page.
5.  **Copy Prices:** Click the "Copy" button next to the target price you wish to use. The price will be copied to your clipboard, ready to be pasted into your broker's order form.
6.  **Refresh Data:** If the option price on the page updates, click the "Refresh Price" button on the overlay to update the calculated targets.
7.  **Close Overlay:** Click the "Close" button to dismiss the overlay.

## Future Enhancements (Ideas)

-   Position sizing calculator.
-   Breakeven point calculations for complex strategies.
-   Integration with options Greeks (Delta, Gamma, Theta, Vega).
-   Customizable UI themes.

## Disclaimer

This extension is for informational and assistive purposes only. It does not execute trades or connect directly to brokerage APIs. All trading decisions and order placements are solely the user's responsibility. Options trading involves significant risk and is not suitable for all investors. Always understand the risks involved before trading.

This extension is not affiliated with or endorsed by Robinhood or any other brokerage platform. Please adhere to the terms of service of your brokerage.
