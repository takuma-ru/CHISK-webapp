<template>
  <div class="main">
    <p class="load-text">
      Loading
    </p>
    <div class="load-bar" />
    <div class="load-bar-two" />
    <div class="load-bar-three" />
    <p class="tips">
      読み込みが終わらない場合は<br>アプリを開きなおしてみてください
    </p>
  </div>
</template>

<style lang="scss" scoped>
body {
  margin: 0px;
}

html {
  overflow-y: hidden;

  background-color: #002550;
}

.main {
  position: fixed;
  display: flex;
  width: 100vw;
  height: 30vh;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  flex-direction: column;
  align-items: center;
}

.tips {
  color: #bec6cf;
  font-size: small;
  text-align: center;
}

.load-text {
  color: #f7fbff;
  font-size: x-large;
  font-weight: bold;
}

.load-bar, .load-bar-two, .load-bar-three {
  position: relative;
  width: 80vmin;
  height: 8px;
  margin-bottom: 4px;

  overflow: hidden;
  border-radius: 8px;

  &::after {
    position: absolute;
    content: "";
    width: 0%;
    height: 100%;

    border-radius: 2em;
    background-color: #77edac;
    animation-name: load-bar-anim;
    animation-duration: 4s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  &-two::after {
    position: absolute;
    content: "";
    width: 0%;
    height: 100%;

    border-radius: 2em;
    background-color: #77edac;
    animation-name: load-bar-anim;
    animation-duration: 4s;
    animation-delay: 0.3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  &-three::after {
    position: absolute;
    content: "";
    width: 0%;
    height: 100%;

    border-radius: 2em;
    background-color: #77edac;
    animation-name: load-bar-anim;
    animation-duration: 4s;
    animation-delay: 0.9s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
}

@keyframes load-bar-anim {
  0% {
    width: 0%;
    background-color: #77edac;
  }

  50% {
    width: 100%;
    background-color: #8bccff;
  }

  100% {
    width: 0%;
    right: 0px;
    background-color: #7786ff;
  }
}
</style>
