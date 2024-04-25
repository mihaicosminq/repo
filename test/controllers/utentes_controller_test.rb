require "test_helper"

class UtentesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get utentes_create_url
    assert_response :success
  end
end
