import TodoForm from "@/components/todos/todo-form"

export default function EditTodoPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Tarea</h1>
      <TodoForm todoId={params.id} />
    </div>
  )
}
