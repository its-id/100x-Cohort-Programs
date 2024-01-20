import RevenueCard from "../components/dukaan-components/RevenueCard";

//👇 This default export determines where your story goes in the story list
export default {
  component: RevenueCard,
};

export const FirstStory = {
  args: {
    //👇 The args you need here will depend on your component
    variant: 'secondary'
  },
};
