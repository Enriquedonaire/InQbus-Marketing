import TodoForm from "@/components/todos/todo-form"

export default function EditTodoPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-6 py-8">
      <TodoForm todoId={params.id} />
    </div>
  )
}
