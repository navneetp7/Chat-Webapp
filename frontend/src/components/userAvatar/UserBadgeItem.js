import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={5}
      py={1}
      borderRadius="lg"
      m={1}
      variant="solid"
      fontSize={14}
      bg="#F5F5F5"
      color="black"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1.5} />
    </Badge>
  );
};

export default UserBadgeItem;
