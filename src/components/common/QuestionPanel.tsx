

interface QuestionPanelProps {
    imgSrc: string;
    correctAnswer: string;
    wrongAnswers: string[];
}



const QuestionPanel = ({imgSrc, correctAnswer, wrongAnswers}: QuestionPanelProps) => {


    const shuffleAnswers = (correctAnswer: string, wrongAnswers: string[]) => {
        const answers = [correctAnswer, ...wrongAnswers]
        return answers.sort(() => Math.random() - 0.5)
    }



    return (
        <div>
            <img src={imgSrc} width="64px" alt="question" />

            <div className="answers-grid">
                {shuffleAnswers(correctAnswer, wrongAnswers).map((answer, index) => (
                    <div key={index} className="answer-box">
                        {answer}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default QuestionPanel