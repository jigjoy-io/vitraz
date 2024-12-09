from pydantic import BaseModel, Field
import uuid
from abc import ABC, abstractmethod
from typing import Optional, List, Union


class BuildingBlock(ABC):
    """Abstract base class for all building blocks."""
    type: str

    @abstractmethod
    def get_block(self):
        raise NotImplementedError("Subclass must implement this method")


class BaseBuildingBlock(BaseModel):
    """Concrete base model for Pydantic validation, derived from abstract BuildingBlock."""
    type: str

    class Config:
        arbitrary_types_allowed = True


class Heading(BaseBuildingBlock):
    """Information about Heading building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "heading"
    text: Optional[str] = Field(default=None, description="Medium-sized heading text.")

    def get_block(self):
        return f"[{self.type}] {self.id} {self.text}"


class Title(BaseBuildingBlock):
    """Information about Title building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "title"
    text: Optional[str] = Field(default=None, description="Large-sized heading text.")

    def get_block(self):
        return f"[{self.type}] {self.id} {self.text}"

class QuestionContent(BaseModel):
    """Information about question's content."""

    displayQuestion: Optional[bool] = Field(default=True, description="Flag that tells rendering engine to display question text or not")
    displayImage: Optional[bool] = Field(default=False, description="Flag that tells rendering engine to display question image or not")
    text: Optional[str] = Field(default=None, description="Question text")
    image: Optional[str] = Field(default=None, description="Question image url")

class QuestionAnswer(BaseModel):
    """Information about question's answer."""


    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator for answer option")
    correct: bool = Field(default=True, description="Flag that tells rendering engine is this answer correct")
    text: Optional[str] = Field(default=None, description="Answer text")

class PositiveAnswer(BaseModel):
    """Information about question's message for positive answer."""

    type: str = "success"
    title: str = Field(default="Great!", description="Positive message title")
    message: str = Field(default="The answer is correct.", description="Positive message")

class NegativeAnswer(BaseModel):
    """Information about question's message for negative answer."""


    type: str = "danger"
    title: str = Field(default="Better luck next time", description="Negative message title")
    message: str = Field(default="The answer is not correct.", description="Negative message")

class QuestionOutcomes(BaseModel):
    """Information about question's outome messages."""

    confirmationButtonText: str = Field(default="Check the answer", description="The button text for checking answer")
    correct: PositiveAnswer = Field(
        default_factory=PositiveAnswer, description="The message that will be shown when the user answer positevly"
    )
    incorrect: NegativeAnswer = Field(
        default_factory=NegativeAnswer, description="The message that will be shown when the user answer negatively"
    )

class Question(BaseBuildingBlock):
    """Information about multi-choice Question building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "question"
    content: QuestionContent = Field(
        default_factory=QuestionContent, description="Question content such as question text, image."
    )
    answers: List[QuestionAnswer] = Field(
        default_factory=list, description="Answer options for the question"
    )

    outcomes: QuestionOutcomes = Field(
        default_factory=NegativeAnswer, description="Messages that will be shown after user check the answer"
    )

    def get_block(self):
        answers_text = " ".join([f"{answer.text} (Correct: {answer.correct})" for answer in self.answers])
        return f"[{self.type}] {self.id}\nContent: {self.content}\nAnswers: {answers_text}\n"

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to Question blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "question":
                    parsed_blocks.append(cls(**block))
                else:
                    raise ValueError(f"Unknown block type for Question: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks

class Text(BaseBuildingBlock):
    """Information about a Text building block."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "text"
    text: str = Field(..., description="Paragraph text.")

    def get_block(self):
        return f"[{self.type}] {self.id} {self.text}"

class SingleQuestion(BaseModel):
    """Container for a list of building blocks."""
    buildingBlocks: List[Union['Question']] = Field(
        default_factory=list,
        description="The list with the single question"
    )

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to building blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "question":
                    parsed_blocks.append(Question(**block))
                else:
                    raise ValueError(f"Unknown building block type: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks
    
class QuestionPage(BaseBuildingBlock):
    """Information about a question page."""
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = Field(default='page', description="Question page is page building block.")
    name: str = Field(description="The shortest possible description of the question")
    config: SingleQuestion = Field(
        default_factory=SingleQuestion, description="The building blocks that will be rendered on the page."
    )

    def get_block(self):
        blocks = " ".join(block.get_block() for block in self.config.buildingBlocks)
        return f"[{self.type}] {self.id}\n{blocks}\n"

class BuildingBlocks(BaseModel):
    """Container for a list of building blocks."""
    buildingBlocks: List[Union['CarouselTile', 'Title', 'Heading', 'Text']] = Field(
        default_factory=list,
        description="List of building blocks such as carousel, title, heading, or text."
    )

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to building blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "carousel":
                    parsed_blocks.append(CarouselTile(**block))
                elif block_type == "title":
                    parsed_blocks.append(Title(**block))
                elif block_type == "heading":
                    parsed_blocks.append(Heading(**block))
                elif block_type == "text":
                    parsed_blocks.append(Text(**block))
                else:
                    raise ValueError(f"Unknown building block type: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks

class TopicIntorductionPage(BaseBuildingBlock):
    """Information about a micro-lessons page."""
    
    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = Field(default='page', description="TopicIntroductionPage is a page.")
    name: str = Field(description="The shortest possible description of the topic")
    config: BuildingBlocks = Field(
        default_factory=BuildingBlocks, description="TopicIntroductionPage usually has a few blocks: heading (topic heading) and text block (topic explanation)."
    )

    def get_block(self):
        blocks = " ".join(block.get_block() for block in self.config.buildingBlocks)
        return f"[{self.type}] {self.id} {self.name} {blocks}\n"
    
class Buttons(BaseModel):
    """Navigation buttons for the Carousel."""
    previous: str = Field(default="Previous", description="Text for the Previous button.")
    next: str = Field(default="Next", description="Text for the Next button.")
    home: str = Field(default="Back to Home", description="Text that would be displayed on the button which redirect user to home page.")

class CarouselConfig(BaseModel):
    """The info about carousel configuration."""

    buttons: Buttons = Field(default_factory=Buttons, description="Navigation buttons.")
    pages:  List[Union['TopicIntorductionPage', 'QuestionPage']] = Field(default_factory=list, description="The list of carousel's pages")

class CarouselPage(BaseBuildingBlock):
    """Information about a Carousel building block."""


    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "carousel"
    name: Optional[str] = Field(default=None, description="Shrtest title of the carousel. It should be summarization of carousel pages provided in the config.")
    config: CarouselConfig = Field(default_factory=CarouselConfig, description="The container for carousel configuration. Contains definition of pages and navigation buttons")


class CarouselTile(BaseBuildingBlock):
    """Information about a Carousel tile building block."""

    id: str = Field(default=str(uuid.uuid4()), description="Unique identificator of building block")
    type: str = "carousel-tile"
    title: Optional[str] = Field(default=None, description="Title of the section/carousel")
    description: Optional[str] = Field(default=None, description="Single sentence description about the section/carousel")

    
    cta: str = Field(default="Start", description="Text for the call-to-action button which runs carousel.")
    page: CarouselPage = Field(default_factory=CarouselPage, description="The page will be renderd when user click on the call-to-action button")

    def get_block(self):
        pages = " ".join(page.get_block() for page in self.config.pages)
        return f"[{self.type}] {self.title} {self.description} {self.id} {pages} {self.buttons}\n"


class Lessons(BaseModel):
    """Container for a carousels."""
    buildingBlocks:  List[Union['CarouselTile']]  = Field(default_factory=list, description="Lessons are consists from multiple carousels")

    @classmethod
    def parse_raw_blocks(cls, raw_blocks):
        """Convert raw dictionaries to building blocks."""
        parsed_blocks = []
        for block in raw_blocks:
            if isinstance(block, dict):
                block_type = block.get("type")
                if block_type == "carousel-tile":
                    parsed_blocks.append(CarouselTile(**block))
                else:
                    raise ValueError(f"Unknown building block type: {block_type}")
            else:
                parsed_blocks.append(block)
        return parsed_blocks
    
class LessonTemplate(BaseBuildingBlock):
    """Information about a Lesson Template."""
    
    id: str = str(uuid.uuid4())
    name: str = Field(description="The shortest possible description of the lesson")
    type: str = "page"
    config: Lessons = Field(description="The building blocks that will be rendered on the page.")

    def get_block(self):
        blocks = " ".join(block.get_block() for block in self.config.pages)
        return f"[{self.type}] {self.id}\n{blocks}\n"

# Update forward references
CarouselConfig.update_forward_refs()
BuildingBlocks.update_forward_refs()
Lessons.update_forward_refs()
SingleQuestion.update_forward_refs()
