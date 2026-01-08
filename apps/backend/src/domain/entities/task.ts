export interface TaskProps {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export class Task {
  private props: TaskProps;

  constructor(props: TaskProps) {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error("Task title is required");
    }

    this.props = {
      ...props,
      completed: props.completed ?? false,
    };
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get completed() {
    return this.props.completed;
  }

  get userId() {
    return this.props.userId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  toggle() {
    this.props.completed = !this.props.completed;
  }
}
