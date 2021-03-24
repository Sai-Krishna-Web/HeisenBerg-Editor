import React from 'react';
import {Editor, EditorState,RichUtils,DefaultDraftBlockRenderMap,convertFromRaw,
    convertToRaw} from 'draft-js';
import { Button, Input, Dropdown } from 'semantic-ui-react';
import { CompactPicker } from 'react-color';
import { Map } from 'immutable';
import FontPicker from 'font-picker-react';
//import DocIcon from '../DocIcon.png';




const fontSizes = [
    { text: '4', value: 4 },
    { text: '8', value: 8 },
    { text: '10', value: 10 },
    { text: '12', value: 12 },
    { text: '14', value: 14 },
    { text: '16', value: 16 },
    { text: '20', value: 20 },
    { text: '24', value: 24 },
    { text: '30', value: 30 },
    { text: '36', value: 36 },
    { text: '42', value: 42 },
    { text: '50', value: 50 },
    { text: '64', value: 64 },
    { text: '72', value: 72 },
    { text: '90', value: 90 },
  ];
const UPPERCASE=
{textTransform: 'uppercase', };
const LOWERCASE=
{textTransform: 'lowercase',};

const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
    center: {
      wrapper: <div className={'center-align'} />,
    },
    right: {
      wrapper: <div className={'right-align'} />,
    },
    left: {
      wrapper: <div className={'left-align'} />,
    },
    justify: {
      wrapper: <div className={'justify-align'} />,
    },
  }));

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(),
    inlineStyles: { UPPERCASE, LOWERCASE },
    activeFontFamily: "Open Sans",
    fontSize: 12,
    title:'Untitle Doc',
    editTitle: false,
    prevSave:new Date(),

  };

}



  componentDidMount() {
    if (typeof (Storage) !== "undefined") {
      if(localStorage.getItem('docs') !==null){
        var data = JSON.parse(localStorage.getItem('docs'));
        const content=JSON.parse(data.editor);
        setTimeout(() => {
        this.setState({title:data.title,nlineStyles:data.styles});
        this.setState({ editorState: EditorState.createWithContent(convertFromRaw(content)) });

        //this.state.inlineStyles=data.styles;

        }, 1000)
    }}
        else{
            alert("Sorry, your browser does not support web storage...");
        }
  }
  //componentWillUnmount() {}
  onChange=(editorState)=>
  {this.setState({editorState});}
  toggleEditTitle=()=>{
    this.setState({ editTitle: true });
  }
  changeTitle=(e) =>{
    this.setState({ title: e.target.value });
  }
  saveTitle=()=>{
    this.setState({ editTitle: false });
  }
  falseEditTitle=()=>{
    this.setState({ editTitle: false });
  }
  saveCurrent=()=>{
    this.setState({prevSave:new Date()});
    const rawData = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    var data=JSON.stringify({
        title: this.state.title,
        editor: rawData,
        styles: this.state.inlineStyles
  });
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem('docs', data);
    }
    else{
        alert("Sorry, your browser does not support web storage...");
    }
  }
  confirmClear=()=>{
      this.setState({editorState: EditorState.createEmpty()});
  }

  saveDate=()=> {
    let theDate = new Date(this.state.prevSave);
    let options = { weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return theDate.toLocaleString('en-US', options);
  }
  onUndoClick=(e)=>{
      e.preventDefault();
      this.onChange(EditorState.undo(this.state.editorState));
  }
  onRedoClick=(e)=>{
      e.preventDefault();
      this.onChange(EditorState.redo(this.state.editorState));
  }
  onFontChange=(val)=>{
      const newInlineStyles=Object.assign(
          {},
          this.state.inlineStyles,
          {[val.value]:{fontSize:`${val.value}px`}},
      );
      this.setState({
          inlineStyles:newInlineStyles,
          editorState: RichUtils.toggleInlineStyle(this.state.editorState, val.value),
          fontSize:val.value,
      });
  }
  onChangeColor=(color)=>{
    const newInlineStyles=Object.assign(
        {},
        this.state.inlineStyles,
        {[color.hex]:{color:color.hex}},
    );
    this.setState({
        inlineStyles:newInlineStyles,
    });
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, color.hex));
}
  onStyleClick=(e,style)=>{
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }
  onUnorderListClick=(e)=>{
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));

  }
  onOrderListClick=(e)=>{
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));

  }
  onTextAlign=(e, align)=>{
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, align));

  }

  render() {
    return (
        <div >
            <div className="outerContainer">
            <div className={'outerBar'}>
            <div> </div>
                <div className={'TitleBar'}>
                <div className={'inline docTitle'} onClick={() => this.toggleEditTitle()}>
                {this.state.editTitle ?
                  <div>
                    <Input
                      transparent
                      size={'small'}
                      value={this.state.title}
                      onChange={e => this.changeTitle(e)}
                    >
                      <input />
                      <Button
                        size={'mini'}
                        onMouseDown={() => this.saveTitle()}
                        icon={'check'}
                      />
                      <Button
                        size={'mini'}
                        onMouseDown={() => this.falseEditTitle()}
                        icon={'x'}
                      />
                    </Input>
                  </div>  :
                  <h2>{this.state.title}</h2>}
              </div>
            </div>
                <div>
                    <Button compact size={'small'} icon={'save'} onClick={() => this.saveCurrent()} />


                    <Button compact size={'small'}>
                        <Dropdown floating icon={'trash'}>
                            <Dropdown.Menu direction={'left'}>
                                <Dropdown.Item text={'Clear document'} onClick={() => this.confirmClear()} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button>
                </div>

           </div>
            <div className={'saveTime'}>
              <em>Last saved on { this.saveDate() }</em>
            </div>

            </div>
            <div>
                <Button.Group>
                    <Button size={'mini'} icon={'undo'} onMouseDown={e=>this.onUndoClick(e)}/>

                    <Button size={'mini'} icon={'redo'} onMouseDown={e=>this.onRedoClick(e)}/>
                </Button.Group>{' '}
                <FontPicker
                    apiKey="AIzaSyDdA6xqqZiqD85me7hwxE496xaWuy1fwis"
                    activeFontFamily={this.state.activeFontFamily}
                    onChange={nextFont =>
                        this.setState({
                            activeFontFamily: nextFont.family,
                        })
                    }/>
                <Dropdown
                    compact
                    selection
                    defaultValue={this.state.fontSize}
                    options={fontSizes}
                    onChange={(e, data) => this.onFontChange(data)}
                />{' '}
                <Button.Group>
                    <Button size={'mini'} icon={'bold'} onMouseDown={e=>this.onStyleClick(e,'BOLD')} />
                    <Button size={'mini'} icon={'italic'} onMouseDown={e=>this.onStyleClick(e,'ITALIC')} />
                    <Button size={'mini'} icon={'underline'} onMouseDown={e=>this.onStyleClick(e,'UNDERLINE')} />
                    <Button size={'mini'} icon={'strikethrough'} onMouseDown={e=>this.onStyleClick(e,'STRIKETHROUGH')} />
                </Button.Group>{' '}
                <Dropdown button floating pointing={'top left'} icon={'font'}>
                    <Dropdown.Menu>
                        <Dropdown.Item selected>
                            <CompactPicker onChangeComplete={(c)=>this.onChangeColor(c)} />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button.Group>
                    <Button size={'mini'} icon={'chevron up'} onMouseDown={e=>this.onStyleClick(e,'UPPERCASE')} />
                    <Button size={'mini'} icon={'chevron down'} onMouseDown={e=>this.onStyleClick(e,'LOWERCASE')} />
                </Button.Group>{' '}
                <Button.Group>
                    <Button size={'mini'} icon={'align left'} onMouseDown={e=>this.onTextAlign(e,'left')} />
                    <Button size={'mini'} icon={'align center'} onMouseDown={e=>this.onTextAlign(e,'center')} />
                    <Button size={'mini'} icon={'align right'} onMouseDown={e=>this.onTextAlign(e,'right')} />
                    <Button size={'mini'} icon={'align justify'} onMouseDown={e=>this.onTextAlign(e,'justify')} />
                </Button.Group>{' '}
                <Button.Group>
                    <Button size={'mini'} icon={'list ul'} onMouseDown={e=>this.onUnorderListClick(e)} />
                    <Button size={'mini'} icon={'list ol'} onMouseDown={e=>this.onOrderListClick(e)} />
                </Button.Group>{' '}
            </div>
            <div className="editorHolder">
                <div className="editor apply-font">
                    <Editor editorState={this.state.editorState}
                        onChange={this.onChange}
                        customStyleMap={this.state.inlineStyles}
                        blockRenderMap={myBlockTypes}
                        />
                </div>
            </div>
    </div>
    );
  }
}
export default MyEditor;
