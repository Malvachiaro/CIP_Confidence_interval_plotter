# Confidence Interval Plotter

Confidence Interval Plotter is an open-source program for the creation of high-definition forest plots.
The software is built using web technologies and encapsulated in an application installed on
personal computers. The application does not require an internet connection and works offline.

## Version

Current version: 0.6.3alpha
The software is not ready for production

# How to use it

## Introduction

This guide will help you get started quickly, explaining how you can use the software either through the precompiled executables or by recompiling the software yourself.

## Using Precompiled Executables

To simplify the use of our software, we provide precompiled executables that you can download directly from GitHub or from the website. These executables are available for various platforms and allow you to start using the software immediately without any need for compilation.

### Steps:

1. Visit the [website](https://meta-analysis.actilab.onl) to access the download section.
2. Select and download the executable corresponding to your operating system (Windows, macOS, Linux).
3. Once downloaded, run the file to install or run the software.

## Recompiling the Software

If you prefer to compile the software yourself, follow the instructions below. This can be useful if you want to customize the code or contribute to the development of the project.

### Prerequisites:

Make sure you have the following tools installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (including npm or yarn)
- [Rust](https://www.rust-lang.org/)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/)

### Compilation Instructions:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install dependencies:**

    Using npm:

    ```sh
    npm install
    ```

    Or using yarn:

    ```sh
    yarn install
    ```

3. **Build the Tauri project:**

    ```sh
    npm run tauri build
    ```

    Or using yarn:

    ```sh
    yarn tauri build
    ```

4. **Run the compiled software:**

    After the compilation, you will find the executable in the `src-tauri/target/release` directory. 





