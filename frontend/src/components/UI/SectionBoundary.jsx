import { Component } from "react";

export default class SectionBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="page-wrap py-16">
          <p className="text-sm text-muted">This section could not be displayed.</p>
        </section>
      );
    }
    return this.props.children;
  }
}
