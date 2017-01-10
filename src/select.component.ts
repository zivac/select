import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';

@Component({
  selector: 'upornselect',  
  providers: [{
    provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
  }],
  styleUrls: [ './select.component.css' ],
  templateUrl: './select.component.html'
})
export class SelectComponent implements ControlValueAccessor {

  @Input() options : Array<String>;
  @Output() selected = new EventEmitter();
  selectedOptions = [];
  selectedOption;
  isOpen : Boolean = false;
  @Input() isMultiple;

  // TypeScript public modifiers
  constructor() {}

  toggle () {
    this.isOpen = !this.isOpen;
  }

  selectOption (option) {
    if(this.isMultiple) {
      if(this.selectedOptions.indexOf(option) == -1) this.selectedOptions.push(option);
      else this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
      this.selected.emit(this.selectedOptions);
      this.propagateChange(this.selectedOptions);
    } else {
      this.selectedOption = option;
      this.isOpen = false;
      this.selected.emit(this.selectedOption);
      this.propagateChange(this.selectedOption);
    }
    
  }

  writeValue(value: any) {
    console.log('write', value)
    if(value) {
      if(this.isMultiple) this.selectedOptions = value;
      else this.selectedOption = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
