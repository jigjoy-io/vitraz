import { UserFeedbackDto } from "@dto/user-feedback"
import { Entity } from "@entity/entity"
import { UnmarshalledUserFeedback, UserFeedbackProps } from "@models/types"
import { feedbackSchema } from "@schemas/user-feedback.schema"

export class UserFeedback extends Entity<UserFeedbackProps> {
	private constructor({ id, created, ...props }: UserFeedbackProps) {
		super(props, id, created)
	}

	public static create(props: UserFeedbackDto): UserFeedback {
		const userFeedbackProps: UserFeedbackProps = {
			id: props.id ? props.id : undefined,

			email: props.email,
			feedback: props.feedback,
			requestType: props.requestType,
		}

		const instance: UserFeedback = new UserFeedback(userFeedbackProps)
		instance.validate(feedbackSchema)

		return instance
	}

	toInputDto(): UnmarshalledUserFeedback {
		return {
			id: this.id,
			created: this.created,
			email: this.props.email,
			feedback: this.props.feedback,
			requestType: this.props.requestType,
		}
	}
}
