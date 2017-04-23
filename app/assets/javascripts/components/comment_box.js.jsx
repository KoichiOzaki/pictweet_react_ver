var CommentBox = React.createClass({
  loadCommentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(result) {
        this.setState({comments_data: result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/api/comments", status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    this.setState({data: this.state.comments_data.concat([comment.comment])});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: this.state.data.concat([comment])});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollIntercal);
  },
  getInitialState: function(){
    return {comments_data: []};
  },
  render: function() {
    return (
    <div class="comments">
      <h4>＜コメント一覧＞</h4>
      <CommentList data={this.state.comments_data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNode = this.props.data.map(function (comment) {
    return(
        <p>
          <storng><a href={"/user/" + comment.user_id}>{comment.nickname}:</a></storng>
          {comment.text}
        </p>
    );
    });
    return(
    <div>
      {commentNode}
    </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var comment = ReactDOM.findDOMNode(this.refs.comment_text).value.trim();
    if (!comment) {
      return;
    }
    this.props.onCommentSubmit({comment: comment, tweet_id: this.props.tweet_id});
    ReactDOM.findDOMNode(this.refs.comment_text).value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <textarea cols="30" name="text" placeholder="コメントする" rows="2" ref="comment_text" />
        <input type="submit" value="SENT" />
      </form>
    );
  }
});