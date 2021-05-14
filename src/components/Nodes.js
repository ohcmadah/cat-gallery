export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";

          return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src="${iconPath}" />
                        <div>${node.name}</div>
                    </div>
                `;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node">
                        <img src="./assets/prev.png" />
                    </div>
                    ${nodesTemplate}`
        : nodesTemplate;

      this.$target.querySelectorAll(".Node").forEach(($node) => {
        $node.addEventListener("click", (e) => {
          const { nodeId } = e.currentTarget.dataset;

          if (!nodeId) {
            this.onBackClick();
          }

          const selectedNode = this.state.nodes.find(
            (node) => node.id === nodeId
          );

          if (selectedNode) {
            this.onClick(selectedNode);
          }
        });
      });
    }
  };
}