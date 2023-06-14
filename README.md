# Rate My Professor GMU Extension

![Extension Logo](./src/img/logo.png)

Rate My Professor GMU is a Google Chrome extension that enhances the GMU website by displaying professors' ratings and reviews directly on the Patriot Web interface.

## Features

- Fetches ratings and reviews from Rate My Professor for each listed professor.
- Displays overall rating, level of difficulty, department, and other relevant information.
- Supports primary instructor identification.
- Provides a direct link to the professor's Rate My Professor page for further details.

## Installation

### Option 1. From the Chrome Web Store (Recommended)

The extension can be installed from the [Chrome Web Store](https://chrome.google.com/webstore/detail/rate-my-gmu-professors/baadmmacgcbifdhpcghklkcohafjddpc).

### Option 2. From Source

1. Clone the repository.

2. Open Google Chrome and navigate to chrome://extensions.

3. Enable the Developer mode using the toggle switch in the top right corner.

4. Click on the Load unpacked button and select the cloned repository folder.

5. The extension should now be installed and visible in the extensions list.

## Usage

1. Open the GMU Patriot Web interface in Google Chrome.

2. Log in to your account.

3. The extension will automatically fetch and display professor ratings and reviews in the instructor column.

4. Click on the professor's rating to visit their Rate My Professor page for more information.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [npx](https://www.npmjs.com/package/npx)
- [Google Chrome](https://www.google.com/chrome/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (Recommended)
- [Prettier](https://prettier.io/) (Recommended)

### Installation

1. Clone the repository.

```
git clone https://github.com/Jeong-Min-Cho/Rate-My-GMU-Professors.git
```

2. Install the dependencies.

```
npm install
```

3. Build the extension.

```
npm run build
```

### Usage

1. Open Google Chrome and navigate to chrome://extensions.

2. Enable the Developer mode using the toggle switch in the top right corner.

3. Click on the Load unpacked button and select the cloned repository folder.

4. The extension should now be installed and visible in the extensions list.

5. Make changes to the source code.

6. Reload the extension.

7. Repeat steps 5 and 6 until the desired changes are made.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request. Follow these steps to contribute:

1. Fork the repository.

2. Create an issue describing your idea or bug report on the [Issues](https://github.com/Jeong-Min-Cho/Rate-My-GMU-Professors/issues).

3. Create a new branch with a descriptive name.

```
git checkout -b feature/issue-number/your-feature-name
```

4. Make your changes and commit them.

```
git commit -m "(feat#issue-number): Your commit message"
```

5. Push your changes to your fork.

```
git push origin feature/issue-number/your-feature-name
```

6. Open a pull request.

## License

This project is licensed under the [MIT License](https://github.com/Jeong-Min-Cho/Rate-My-GMU-Professors/blob/main/LICENSE).

## Contact

If you have any questions or inquiries, feel free to contact me at [jeongmincho@outlook.com](mailto:jeongmincho@outlook.com).
