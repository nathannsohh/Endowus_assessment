# Endowus Technical Assessment

The following repo consists of the features and UI as required from the document specification.

![image](https://user-images.githubusercontent.com/70202012/161287448-b731bbae-2ab3-4ed5-90f5-2fd637576b52.png)

# Getting Started

<<<<<<< HEAD

### 1. Install Dependencies

```
# install node modules
$ npm i
```

### 2. Run Application

```
$ npm start
```

# Technology

This single page application was implemented with ReactJS.

# Requirements

1. Provide UI for user to enter two input parameters: Initial Investment and Monthly Investment
2. Fetch investment project data from the mocky.io API
3. Display a project chart where the X-axis indicates the date and Y-axis the amount in SGD
4. Display five line series that convey:
   a) Top 25% outcome of investment projection
   b) Median outcome of investment projection
   c) Bottom 10% outcome of investment projection
   d) Benchmark
   e) Total Deposit
5. Loading state UI while the API is loading

# Components

### 1. Button

![image](https://user-images.githubusercontent.com/70202012/161290129-d9fc6d6e-7477-467e-8348-61a8f22f4092.png)

When clicked, the button component would take the initial investment and monthly investment values from the state and use the values to request the payload to get the data.

### 2. Input

![image](https://user-images.githubusercontent.com/70202012/161290367-1c8a9910-68e5-4694-a0d8-789800849520.png)

The input fields were made such that on change, they would send the data in their fields to the main app, updating the state of the main app.

### 3. Chart

![image](https://user-images.githubusercontent.com/70202012/161290907-a04b69a3-e9b6-4e35-91ae-f9a2590a24b7.png)

The chart was made using a third-party charting library known as React-vis and 5 line series were generated by using the data fetched from the API. A crosshair was made as well to display the data of the 5 lines and the crosshair would appear when the user's cursor goes close to the graph, and would show the data of the nearest X value from the cursor. The coloured circles on the crosshair corresponds to the colour of the line series as well.

### 4. Loading

![image](https://user-images.githubusercontent.com/70202012/161291620-7e38e996-1fbb-48ee-a31e-d9249608563a.png)

A loading state UI was created using a third-party library known as React-loading and the "bubble" loading type was used. The loading UI casts an overlay on the application and it will show up when the app is fetching data from the API.

### 5. App

The main layout was build here and the different components built earlier are used to create the overall application. As the loading state UI and chart will not always be on the application, boolean flags were used to control when the chart will be generated and when the loading state UI will appear.
