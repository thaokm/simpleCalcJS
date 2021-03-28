// Babel JS
class Head extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="my-header row justify-content-center">
                <div className="col text-center">
                    {this.props.content}
                </div>
            </div>
        );
    }
}
class Foot extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="my-footer row justify-content-center">
                <div className="col text-center text-primary">
                    {this.props.content}
                    <br/>
                    <i className="fa fa-copyright"></i> 2021 thao.km
                </div>
            </div>
        );
    }
}
class Display extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={"row justify-content-center " + this.props.displayStyle}>
                <div className="col text-right" id={this.props.idNum}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}
class BlankRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let renderHeight = {height: this.props.height};
        return(
            <div className="row" style={renderHeight}>
            </div>
        );
    }
}
class KeyPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.keyStyle
        };
        this.handlePress = this.handlePress.bind(this);
        this.play = this.play.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handlePress);
    }
    handlePress(e) {
        if (e.keyCode == this.props.keyCode) {
            this.play();
        }
    }
    play() {
        this.props.sendDisplay(this.props.keyName);
        this.setState({status: "key-press"});
        setTimeout(() => {
            this.setState({status: this.props.keyStyle})
        }, 150);
        
    }
    render() {
        let keyWidth = '';
        switch (this.props.keyName) {
            case '0': 
                keyWidth = 'col-6 key-2';
                break;
            case 'C':
                keyWidth = 'col-9 key-3';
                break;
            default:
                keyWidth = 'col-3 key-1';
                break;
        }
        return(
            <div className={"key text-center " + keyWidth + " " + this.state.status}
                onClick = {this.play}
                id = {this.props.id}>
                {this.props.keyName}
            </div>
        );
    }
}
class CalcPad extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="row justify-content-around calc-pad">
                <KeyPad id="clear" keyName="C" keyCode="27" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="add" keyName="+" keyCode="107" sendDisplay={this.props.sendDisplay} keyStyle="key-operator" />

                <KeyPad id="seven" keyName="7" keyCode="103" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="eight" keyName="8" keyCode="104" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="nine" keyName="9" keyCode="105" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="subtract" keyName="-" keyCode="109" sendDisplay={this.props.sendDisplay} keyStyle="key-operator" />

                <KeyPad id="four" keyName="4" keyCode="100" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="five" keyName="5" keyCode="101" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="six" keyName="6" keyCode="102" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="multiply" keyName="×" keyCode="106" sendDisplay={this.props.sendDisplay} keyStyle="key-operator" />

                <KeyPad id="one" keyName="1" keyCode="97" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="two" keyName="2" keyCode="98" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="three" keyName="3" keyCode="99" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="divide" keyName="÷" keyCode="111" sendDisplay={this.props.sendDisplay} keyStyle="key-operator" />

                <KeyPad id="zero" keyName="0" keyCode="96" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="decimal" keyName="." keyCode="110" sendDisplay={this.props.sendDisplay} keyStyle="key-num" />
                <KeyPad id="equals" keyName="=" keyCode="13" sendDisplay={this.props.sendDisplay} keyStyle="key-function" />
            </div>
        );
    }
}
function calc(num1, num2, operator) {
    let result;
    let n1 = parseFloat(num1);
    let n2 = parseFloat(num2);
    switch (operator) {
        case '+':
            result = n1 + n2;
            break;
        case '-':
            result = n2 - n1;
            break;
        case '×':
            result = n2 * n1;
            break;
        case '÷':
            result = n2 / n1;
            break;
    }
    return result.toString();
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayNum: '0',
            storageNum: '',
            operator: ''
        }
        this.sendDisplay = this.sendDisplay.bind(this);
    }
    sendDisplay(input) {
        // this.setState({displayNum: this.state.displayNum + input})
        let currentDisplayNum = this.state.displayNum;
        let currentStorageNum = this.state.storageNum;
        let currentOperator = this.state.operator;
        switch (input) {
            case 'C':
                this.setState({
                    displayNum: '0',
                    storageNum: '',
                    operator: ''        
                });
                break;
            case '=':
                if ((currentDisplayNum == '') || (currentStorageNum == '') || (currentOperator == '')) {
                    // khong lam gi
                } else {
                    this.setState({
                        displayNum: calc(currentDisplayNum, currentStorageNum, currentOperator),
                        storageNum: '',
                        operator: ''            
                    });
                }
                break;
            case '+':
            case '-':
            case '×':
            case '÷':
                if (currentStorageNum == '') {
                    this.setState({
                        displayNum: '',
                        storageNum: currentDisplayNum,
                        operator: input            
                    });
                } else {
                    switch (currentDisplayNum) {
                        case '':
                            if (input == '-') {
                                this.setState({displayNum: input});
                            } else {
                                this.setState({operator: input});
                            }
                            break;
                        case '-':
                            this.setState({
                                displayNum: '',
                                operator: input
                            });
                            break;
                        default:
                            this.setState({
                                displayNum: '',
                                storageNum: calc(currentDisplayNum, currentStorageNum, currentOperator),
                                operator: input        
                            });
                            break;
                    }
                }
                break;
            case '0':
                if (currentDisplayNum != '0') {
                    this.setState({displayNum: currentDisplayNum + input});
                }
                break;
            case '.':
                if (!currentDisplayNum.includes('.')) {
                    this.setState({displayNum: currentDisplayNum + input});
                }
                break;    
            default:
                if (currentDisplayNum == '0') {
                    this.setState({displayNum: input});
                } else {
                    this.setState({displayNum: currentDisplayNum + input});
                }
                break;
        }
    }
    render() {
        return(
            <div className="container" id="main">
                <BlankRow height="15px" />

                <Head content="JS Calculator" />
                <BlankRow height="30px" />

                <Display text={this.state.displayNum} displayStyle="display-main" idNum="display"/>
                <Display text={this.state.storageNum + " " + this.state.operator} displayStyle="display-buffer" idNum="buffer"/>
                <BlankRow height="30px" />

                <CalcPad sendDisplay={this.sendDisplay} />
                <BlankRow height="15px" />

                <Foot content="Contact 090-4568-343" />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));