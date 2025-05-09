import TodoForm from "@/components/todos/todo-form"

export default function NewTodoPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Nueva Tarea</h1>
      <TodoForm />
    </div>
  )
}
