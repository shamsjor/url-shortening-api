let app = new Vue({
  el: "#app",
  data: {
    links: [],
    link: ``,
    isEmpty: false,
  },
  methods: {
    shorten: function (event) {
      if (!this.link) {
        this.isEmpty = true;
        event.preventDefault();
      } else {
        this.isEmpty = false;
        let myRequest = new XMLHttpRequest();
        let objLink = { longLink: `${this.link}`, shortLink: `` };
        this.links.push(objLink);
        myRequest.onreadystatechange = function () {
          if (this.status === 201 && this.readyState === 4) {
            let obj = JSON.parse(this.responseText);
            objLink.shortLink = obj.result.full_short_link;
          }
        }
      myRequest.open(
        `GET`,
        `https://api.shrtco.de/v2/shorten?url=${this.link}`,
        true
      );
      myRequest.send();
      this.link = ``;
      }
    },
    copy: function (event) {
      let button = event.target;
      button.classList.add(`copied`);
      button.innerText = `copied`;
      navigator.clipboard.writeText(this.links[event.target.id].shortLink);
    },
  },
});
