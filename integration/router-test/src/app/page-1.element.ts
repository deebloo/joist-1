import './page-2.element';

import { JoistElement, Component } from '@joist/component';
import { Route } from '@joist/router';
import { html } from 'lit-html';

const routes: Route[] = [
  { path: '/foo/bar', component: () => document.createElement('page-2-element') },
];

export interface AppState {
  title: string;
}

@Component<AppState>({
  state: {
    title: 'Page1Component Works!',
  },
  render({ state }) {
    return html`
      <h2>${state.title}</h2>

      <router-outlet .routes=${routes}></router-outlet>
    `;
  },
})
class Page1Element extends JoistElement {}

customElements.define('page-1-element', Page1Element);