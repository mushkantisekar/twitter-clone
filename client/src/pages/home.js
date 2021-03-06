import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Tweet from "../components/tweet/Tweet";
import Profile from "../components/profile/Profile";
import TweetSkeleton from "../util/TweetSkeleton";

// Redux stuff
import { connect } from "react-redux";
import { getTweets } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "rgb(214, 214, 214)";
    this.props.getTweets();
  }

  render() {
    const { tweets, loading } = this.props.data;
    let recentTweetsMarkup = !loading ? (
      tweets.map((tweet) => (
        <Tweet key={tweet.tweetId} tweet={tweet} userImage={tweet.userImage} />
      ))
    ) : (
      <TweetSkeleton />
    );

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} md={4}>
          <Profile />
        </Grid>
        <Grid item xs={12} md={1}>
          <div style={{ width: 20, height: 20 }} />
        </Grid>
        <Grid item xs={12} md={7}>
          {recentTweetsMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getTweets: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getTweets })(home);
