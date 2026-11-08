// Recompose the original functional prototype into a CAD-style application shell.
// Existing drawing, generation, download and print handlers remain attached to their elements.
(() => {
  const workspace = document.querySelector('.workspace');
  if (!workspace || workspace.dataset.layout === 'studio') return;
  const sketch = document.getElementById('sketch');
  const preview = document.getElementById('preview');
  const tools = document.querySelector('.toolrow');
  const spec = document.getElementById('spec').closest('.field');
  const settings = document.querySelector('.params');
  const name = document.getElementById('drawingName').closest('.field');
  const generate = document.getElementById('generate');
  const status = document.getElementById('status');
  const actions = document.querySelector('.output-row');
  const outputNote = document.querySelectorAll('.pane .notice')[1];
  const make = (tag, className, content) => {
    const node = document.createElement(tag);
    node.className = className;
    if (content) node.textContent = content;
    return node;
  };

  const rail = make('aside', 'lab-rail');
  const railTitle = make('div', 'lab-rail-title', 'TOOLS');
  rail.append(railTitle, tools);

  const stage = make('section', 'lab-stage');
  stage.setAttribute('aria-label', 'Design drawing workspace');
  const tabs = make('div', 'lab-tabs');
  const sketchTab = make('button', 'lab-tab active', 'Sketch');
  const blueprintTab = make('button', 'lab-tab', 'Blueprint');
  sketchTab.type = blueprintTab.type = 'button';
  sketchTab.setAttribute('aria-pressed', 'true');
  blueprintTab.setAttribute('aria-pressed', 'false');
  const coords = make('span', 'lab-coords', 'XY · ORTHOGRAPHIC / CONCEPT');
  tabs.append(sketchTab, blueprintTab, coords);
  const sketchView = make('div', 'lab-view lab-sketch-view');
  const blueprintView = make('div', 'lab-view lab-blueprint-view');
  blueprintView.hidden = true;
  const canvasFrame = make('div', 'lab-canvas-frame');
  canvasFrame.append(sketch);
  sketchView.append(canvasFrame, make('div', 'lab-canvas-caption', 'Drag to draw · Sketch paths are stored in this browser session'));
  blueprintView.append(preview);
  stage.append(tabs, sketchView, blueprintView);

  const inspector = make('aside', 'lab-inspector');
  const inspectorHead = make('div', 'lab-inspector-head');
  inspectorHead.append(make('strong', '', 'Project settings'), make('span', '', 'REV 01'));
  const inspectorBody = make('div', 'lab-inspector-body');
  const specDivider = make('div', 'lab-section-label', 'DESIGN BRIEF');
  const dimsDivider = make('div', 'lab-section-label', 'GEOMETRY');
  const exportDivider = make('div', 'lab-section-label', 'EXPORT');
  inspectorBody.append(name, specDivider, spec, dimsDivider, settings, generate, status, exportDivider, actions, outputNote);
  inspector.append(inspectorHead, inspectorBody);
  workspace.replaceChildren(rail, stage, inspector);
  workspace.dataset.layout = 'studio';

  function activate(which) {
    const showSketch = which === 'sketch';
    sketchView.hidden = !showSketch;
    blueprintView.hidden = showSketch;
    sketchTab.classList.toggle('active', showSketch);
    blueprintTab.classList.toggle('active', !showSketch);
    sketchTab.setAttribute('aria-pressed', String(showSketch));
    blueprintTab.setAttribute('aria-pressed', String(!showSketch));
  }
  sketchTab.addEventListener('click', () => activate('sketch'));
  blueprintTab.addEventListener('click', () => activate('blueprint'));
  generate.addEventListener('click', () => {
    if (!document.getElementById('download').disabled) activate('blueprint');
  });
  document.getElementById('update').addEventListener('click', () => activate('blueprint'));
  document.getElementById('sample').addEventListener('click', () => activate('sketch'));
})();
