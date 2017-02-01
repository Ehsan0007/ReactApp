import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

var component1 = React.createClass({
  propTypes : {
    name : React.PropTypes.string.isRequired,
  },
  render : function(){
    return React.DOM.h1(null,"Hello " + this.props.name)
  }
})

ReactDOM.render(
  React.createElement(component1,
  {
    name : "World",
  }
  ),
  document.getElementById('root1')
)




var comp = React.createClass({
  propTypes : {
    name : React.PropTypes.string.isRequired
  },
  
  getInitialState:function(){
    return {
      name:this.props.name
    }
  },
  changeText:function(e){
   this.setState({
    name:e.target.value, 
   })
  },
  componentDidUpdate:function(oldProps,oldStates){
     if(this.state.name.length > 5){
       this.replaceState(oldStates);
       alert("limil exceed");
     }
  },
  render: function()
  {
    return React.DOM.div(null,
    React.DOM.textarea({value : this.state.name,onChange:this.changeText}),React.DOM.h1(null,this.state.name.length)
    )
    
  }
})

var result = ReactDOM.render(React.createElement(comp,{name: "Ehsan"}),document.getElementById('app'))








var component = React.createClass({
  getInitialState : function()
  {
    return {
      count: 0
    }
  },
  Increament:function()
  {
    this.setState({
      count : this.state.count+1
    });
  },
  decreament: function(){
    this.setState({
      count : this.state.count-1,
    });
  },
render:function()
{
  return <div><h1>{this.state.count}</h1><button onClick={this.Increament}>Increment</button><button onClick={this.decreament}>Decrement</button></div>
}
})
var a = React.createElement(component);
ReactDOM.render(a
,
document.getElementById('root'))




var Excel = React.createClass({
        displayName: 'Excel',
        
        propTypes: {
          headers: React.PropTypes.arrayOf(
            React.PropTypes.string
          ),
          initialData: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
              React.PropTypes.string
            )
          ),
        },

        getInitialState: function() {
          return {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index]
          };
        },
        
        _sort: function(e) {
          var column = e.target.cellIndex;
          var data = this.state.data.slice();
          var descending = this.state.sortby === column && !this.state.descending;
          data.sort(function(a, b) {
            return descending 
              ? (a[column] < b[column] ? 1 : -1)
              : (a[column] > b[column] ? 1 : -1);
          });
          this.setState({
            data: data,
            sortby: column,
            descending: descending,
          });
        },
        
        _showEditor: function(e) {
          this.setState({edit: {
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
          }});
        },
        
        _save: function(e) {
          e.preventDefault();
          var input = e.target.firstChild;
          var data = this.state.data.slice();
          data[this.state.edit.row][this.state.edit.cell] = input.value;
          this.setState({
            edit: null,
            data: data,
          });
        },
        
        render: function() {
          return (
            React.DOM.table(null,
              React.DOM.thead({onClick: this._sort},
                React.DOM.tr(null,
                  this.props.headers.map(function(title, idx) {
                    if (this.state.sortby === idx) {
                      title += this.state.descending ? ' \u2191' : ' \u2193'
                    }
                    return React.DOM.th({key: idx}, title);
                  }, this)
                )
              ),
              React.DOM.tbody({onDoubleClick: this._showEditor},
                this.state.data.map(function(row, rowidx) {
                  return (
                    React.DOM.tr({key: rowidx},
                      row.map(function(cell, idx) {
                        var content = cell;
                        var edit = this.state.edit;
                        if (edit && edit.row === rowidx && edit.cell === idx) {
                          content = React.DOM.form({onSubmit: this._save},
                            React.DOM.input({
                              type: 'text',
                              defaultValue: cell,
                            })
                          );
                        }

                        return React.DOM.td({
                          key: idx,
                          'data-row': rowidx,
                        }, content);
                      }, this)
                    )
                  );
                }, this)
              )
            )
          );
        }
      });
      
      var headers = [
        "Book", "Author", "Language", "Published", "Sales"
      ];
      
      var data = [
        ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"], 
        ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"], 
        ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"], 
        ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"], 
        ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"], 
        ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"], 
        ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
      ];
      
      ReactDOM.render(
        React.createElement(Excel, {
          headers: headers,
          initialData: data,
        }),
        document.getElementById("table")
      );






