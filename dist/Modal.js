
var React = require('react');
var ThemeMixin = require('./theme-mixin');

module.exports = React.createClass({displayName: "exports",

  mixins: [ThemeMixin],

  getDefaultProps: function() {
    return {
      isOpen: false,
      flush: false,
      fullBleed: false,
      size: 'medium',
      header: '',
      theme: 'white',
      onDismiss: function() {}
    }
  },

  render: function() {

    var isOpen = this.props.isOpen;
    var header = this.props.header;
    var classes = this.getThemeClasses();
    classes.body = this.props.flush ? '' : 'p2';
    classes.header = 'flex flex-center ' + classes.main + (classes.border ? ' border-bottom' : '');
    classes.container = 'flex flex-center overflow-auto bg-darken-4 ' + (this.props.fullBleed ? '' : 'p2');
    var width = 640;
    if (this.props.size == 'big') { width = 960 }
    else if (this.props.size == 'small') { width = 320 }
    var styles = {
      container: {
        display: isOpen ? '' : 'none',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 4,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      modal: {
        position: 'relative',
        width: this.props.fullBleed ? 'auto' : width,
          //minWidth: '16rem',
        maxWidth: '100%',
        margin: 'auto',
        overflow: 'hidden',
        boxShadow: '0 4px 4px rgba(0,0,0,.1)',
      },
      dismissButton: this.buttonStyle,
    };
    if (this.props.fullBleed) {
      styles.modal.position = 'absolute';
      styles.modal.top = 0;
      styles.modal.right = 0;
      styles.modal.bottom = 0;
      styles.modal.left = 0;
      styles.modal.margin = 0;
    }

    return (
      React.createElement("div", {className: classes.container, 
        style: styles.container}, 
        React.createElement("a", {href: "#!", 
          style: styles.overlay, 
          onClick: this.props.onDismiss}), 
        React.createElement("div", {className: "bg-white rounded", 
          style: styles.modal}, 
          React.createElement("div", {className: classes.header}, 
            React.createElement("div", {className: "bold p2 flex-auto"}, header), 
            React.createElement("button", {className: "h3", 
              style: styles.dismissButton, 
              onClick: this.props.onDismiss, 
              title: "Dismiss modal overlay"}, 
              "×"
            )
          ), 
          React.createElement("div", {className: classes.body}, 
            this.props.children
          )
        )
      )
    )

  }

});
