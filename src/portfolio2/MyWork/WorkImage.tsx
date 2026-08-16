import { CometCard } from "../../components/ui/comet-card";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  return (
    <div className="work-image">
      <CometCard className="w-full">
        <div
          className="work-image-in"
          data-cursor={"disable"}
          style={{ cursor: "none" }}
        >
          <img src={props.image} alt={props.alt} />
        </div>
      </CometCard>
    </div>
  );
};

export default WorkImage;
