import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import the FormBuilder, FormGroup, and Validators classes from the Angular forms module.
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
/**
 * Componente de formulário de tarefa.
 * 
 * Este componente é responsável por gerenciar o formulário de criação e atualização de tarefas.
 * Ele utiliza o Angular Reactive Forms para criar e validar o formulário.
 * 
 * @property {Task | null} currentTask - A tarefa atual que está sendo editada, ou null se uma nova tarefa está sendo criada.
 * @property {'UPDATE' | 'CREATE'} formType - O tipo de formulário, que pode ser 'UPDATE' para edição ou 'CREATE' para criação.
 * @property {EventEmitter<'SUBMIT'>} closePanel - Evento emitido quando o formulário é enviado com sucesso.
 * @property {FormGroup} taskForm - O grupo de controles do formulário de tarefa.
 * @property {TaskService} taskService - Serviço injetado para manipulação de tarefas.
 * @property {FormBuilder} fb - Serviço injetado para construção do formulário.
 * 
 * @method ngOnChanges - Método chamado quando há mudanças nas propriedades de entrada do componente.
 * @param {SimpleChanges} changes - Objeto contendo as mudanças nas propriedades de entrada.
 * 
 * @method handleSubmit - Método chamado ao enviar o formulário de tarefa.
 * 
 * Verifica se o formulário é válido, cria um novo objeto de tarefa com os valores do formulário,
 * adiciona a data de criação e define o status de conclusão como falso. Em seguida, chama o serviço
 * de criação de tarefa e emite um evento para fechar o painel.
 */
export class TaskFormComponent {
  @Input() currentTask: Task | null = null;
  @Input() formType: 'UPDATE' | 'CREATE' = 'CREATE';
  @Output() closePanel = new EventEmitter<'SUBMIT' | 'CANCEL'>();
  taskForm: FormGroup; // Create a FormGroup object to hold the form data.
  private taskService = inject(TaskService); // Inject the TaskService into the constructor.
  private fb = inject(FormBuilder);

  constructor() { // Inject the FormBuilder service into the constructor.
    this.taskForm = this.fb.group({ // Create a FormGroup object with the FormBuilder service.
      name: ['', Validators.required], // Create a FormControl object for the task name input field.
      description: [''], // Create a FormControl object for the task description input field.
      createdAt: ['', Validators.required], // Create a FormControl object for the task creation date input field.
      id: ['0'], // Create a FormControl object for the task ID input field.
      project: [0] // Create a FormControl object for the task project input field.
    });
  }


  /**
   * Método do ciclo de vida do Angular que é chamado quando uma ou mais propriedades ligadas a dados de entrada 
   * (input properties) de um componente mudam.
   * 
   * @param changes - Um objeto do tipo `SimpleChanges` que contém as mudanças nas propriedades de entrada.
   *  Cada propriedade tem um objeto `SimpleChange` que contém o valor anterior e o valor atual.
   * 
   * Este método verifica se a propriedade `currentTask` mudou e se o novo valor não é nulo. 
   * Se essas condições forem atendidas, ele formata a data de criação da tarefa (`createdAt`) 
   * e atualiza o formulário da tarefa (`taskForm`) com os novos valores.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentTask'] && changes['currentTask'].currentValue) {
      const task = changes['currentTask'].currentValue as Task;

      const dueDateFormatted = task.createdAt
        ? new Date(task.createdAt).toISOString().split('T')[0]
        : '';

      this.taskForm.patchValue({
        ...task,
        createdAt: dueDateFormatted
      })
    }
  }

  /**
   * Manipula o envio do formulário de tarefa.
   * 
   * Verifica se o formulário de tarefa é válido. Se for, cria um novo objeto de tarefa
   * com os valores do formulário, adiciona a data de criação e define o status de 
   * conclusão como falso. Em seguida, chama o serviço de criação de tarefa e emite 
   * um evento para fechar o painel.
   */
  handleSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        createdAt: new Date(this.taskForm.value.createdAt),
        completed: this.formType === "UPDATE" ? this.taskForm.value.completed : false
      }
      if (this.formType === "CREATE") {

        this.taskService.createTask(newTask);
      } else {
        this.taskService.updateTask(newTask);

      }
      this.closePanel.emit('SUBMIT');

    };
  }

  handleCancel() {
    this.closePanel.emit('CANCEL');
  }
}