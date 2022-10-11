import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';


// gera dados para a classe abaixo
@Component({
  selector: 'app-root', //<app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//classe pública
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  //método executado quando a aplicação inicia
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
  }

  //métodos 
  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo); //captura o indice do todo (se ele não encontrar vai ser -1)
    if (index !== -1) {
      this.todos.splice(index, 1); //remove 1 item do indice acima
    }
    this.save();
  }

  markAsDone(todo: Todo) { //marcar tarefa como feita
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) { //marcar tarefa como pendente
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos); //converte JSON em string para salvar
    localStorage.setItem('todos', data); //salva os dados no local storage
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos'); //recebe a string do local storage
    if (data) {
      this.todos = JSON.parse(data); //converte a string em JSON 
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
