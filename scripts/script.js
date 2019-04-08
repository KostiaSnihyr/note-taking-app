function TodoViewModel(todo) {
    var self = this;
    this.todo = todo;
    self.date = '';
    self.newNoteText = ko.observable('');
    self.notes = ko.observableArray();

    // this.availableColors = ko.observableArray(["red", "slateblue", "lightseagreen", "khaki", "slategray", "deeppink", "coral"]);
    // this.availableColors = ko.observableArray([["red", "1"], ["slateblue", "2"]]);
    this.availableColors = ko.observableArray([{color:"rgb(56,212,208)", colorName: "aquamarine"}, {color:"rgb(209,131,219)", colorName:"purple"}, {color:"rgb(156,219,131)", colorName:"green"}, {color:"rgb(242,105,105)", colorName:"red"}, {color:"rgb(55,170,225)", colorName:"blue"}, {color:"rgb(255,154,127)", colorName:"orange"}]);

    self.chosenColor = ko.observable();
    // self.colorName = ko.observable();

    this.addNote = function() {
        console.log(self.chosenColor().color);
        console.log(self.chosenColor().colorName);

        self.date = moment().format('MMMM MM, LT');
        this.todo.addNote(this.newNoteText(), this.chosenColor().color);
        this.newNoteText('');
        this.notes(this.todo.notesArr);
    }
    self.removeNotes = function(note) {
        self.notes.remove(note);
    }
    this.onEditMode = function() {
        this.isEditMode(true);
        this.turnOnBtn(true);
    }
}

function TodoView() {
    this.notesArr = [];
    var counter = 1;
    this.addNote = function(todoTitle, color) {
        this.notesArr.unshift({
            id: 'Note ' + counter++,
            title: ko.observable(todoTitle),
            color: color,
            isEditMode: ko.observable(false),
            turnOnBtn: ko.observable(false)
        })
        console.log(this.notesArr);
    }
}

var todo = new TodoView();

ko.applyBindings(new TodoViewModel(todo), document.getElementById('wrapperr'));